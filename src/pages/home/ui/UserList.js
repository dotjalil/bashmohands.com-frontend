import "./UserList.css";
import { createContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, message } from "antd";
import SearchFilter from "./SearchFilter";
import { Slider } from "../../../components/Slider";
import UserListSkeleton from "./UserListSkeleton";
import loadMoreUsers from "../../../shared/model/loadMoreUsers";
import getFilteredUsers from "../../../shared/model/getFilteredUsers";
const { Meta } = Card;

export const SearchFilterContext = createContext();

export default function UserList({ users }) {
  const [usersList, setUsersList] = useState(users);
  const [isFiltering, setIsFiltering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    end: false,
  });

  const setQuery = (query) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        query: query,
      };
    });
  };

  const setSortBy = (sortBy) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        sortBy: sortBy,
      };
    });
  };

  async function handleLoadMore() {
    const page = pagination.current;
    setLoading(true);
    let loadedUsers;
    if (filters) {
      loadedUsers = await getFilteredUsers(filters, page + 1);
    } else {
      loadedUsers = await loadMoreUsers(page + 1);
    }
    setPagination((prevPagination) => {
      return {
        ...prevPagination,
        current: prevPagination.current + 1,
      };
    });
    if (loadedUsers.length === 0) {
      setPagination((prevPagination) => {
        return {
          ...prevPagination,
          end: true,
        };
      });
      setLoading(false);
      return;
    }
    setUsersList((prevUsersList) => {
      return [...prevUsersList, ...loadedUsers];
    });
    setLoading(false);
  }

  async function filterResults(filterObj) {
    console.log("Run filterResults!");
    setIsFiltering(true);
    // reset pagination to first page
    setPagination({
      current: 1,
      end: false,
    });
    // request filtered user list
    try {
      const filteredUsers = await getFilteredUsers(filterObj);
      setUsersList(filteredUsers);
    } catch (err) {
      message.error("Something went wrong, Try Again!");
      console.log("err", err);
    }
    // give a little bit of time to refresh
    setTimeout(() => {
      setIsFiltering(false);
    }, 300);
  }

  return (
    <div>
      <SearchFilterContext.Provider value={{ setFilters, filterResults }}>
        <SearchFilter filters={filters} setFilters={setFilters} />
      </SearchFilterContext.Provider>
      {/* <Slider /> */}
      {isFiltering && <UserListSkeleton />}
      {!isFiltering && (
        <div className="cards">
          {usersList &&
            usersList.map((user) => {
              return (
                <Link to={user.handler} key={user.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={user.photo}
                        style={{
                          objectFit: "cover",
                          borderRadius: "20px",
                        }}
                      />
                    }
                  >
                    <Meta title={`${user.firstName} ${user.lastName}`} />
                    <p className="jopTitle">{user.jobTitle}</p>
                    <div className="child">
                      {user.experience && (
                        <>
                          {" "}
                          <div className="exp">
                            <p className="head">Experience</p>
                            <p style={{ fontWeight: "400" }}>
                              {user.experience?.slice(0, 1)} Years
                            </p>
                          </div>
                          <div className="rate">
                            <p className="head">Rate</p>
                            <p>${user.rating}/hr</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="skills">
                      <p>🔥 Free 30-min session</p>
                      <p>🧑‍🏫 Teaching</p>
                      <p>💼 Career Mentoring</p>
                      <p>+10 more...</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
        </div>
      )}
      {loading && <UserListSkeleton />}
      {pagination.end && <p>End of Results!</p>}
      {!isFiltering && (
        <button onClick={handleLoadMore} disabled={loading || pagination.end}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
