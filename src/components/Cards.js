import React, { useContext, useEffect, useState } from "react";
import "./Cards.css";
import { Card } from "antd";
import ResponseDataContext from "../shared/contexts/responseDataContext";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../pages/profile/ui/Skeleton";
import UsersContext from "../shared/contexts/allUsersContext";
const { Meta } = Card;

export const Cards = () => {
  // const supabaseUrl = "https://ksrhgwdrcefysyognaty.supabase.co";
  // const supabaseKey =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzcmhnd2RyY2VmeXN5b2duYXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5OTYyNjEsImV4cCI6MjAxMjU3MjI2MX0.yVa6x2XVWyDF-Dy5J6XTKLOWVnzG9aoWHmi_jG7g0OY";
  // const supabase = createClient(supabaseUrl, supabaseKey);

  // let [users, setUsers] = useState([]);
  const { users, setUsers } = useContext(UsersContext);
  const getUsers = () => {
    const baseUrl = `https://bashmohands.onrender.com/api/user?page=1&limit=12`;
    // const baseUrl = `http://localhost:5000/api/user/page=1&limit=12`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const { searchData, setsearchData } = useContext(ResponseDataContext);
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: Cards.jsx:11 ~ Cards ~ responseData:", searchData);
    setUsers(searchData.data);
  }, [searchData]);

  return (
    <div className="cards">
      {!users
        ? Array.from({ length: 12 }).map((e) => <ProfileSkeleton />)
        : users &&
          users.map((user, index) => {
            return (
              <Link to={user.handler}>
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
                  key={index}
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
  );
};
