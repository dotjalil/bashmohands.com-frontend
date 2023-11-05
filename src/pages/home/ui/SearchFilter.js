import { useContext, useEffect, useState } from "react";
import "./SearchFilter.css";
import { Switch, Button, Modal, Form, Space, Select } from "antd";
import { SearchFilterContext } from "./UserList";

export default function SearchFilter({ filters }) {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [isInstructor, setIsInstructor] = useState("");
  const [countryFilter, setCountryFilter] = useState([]);
  const [topicFilter, setTopicFilter] = useState([]);
  const [sortByFilter, setSortByFilter] = useState([]);
  // get topic list to show in the dropdown
  const [topicList, setTopicList] = useState(async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API}topic`);
    const data = await res.json();
    setTopicList(data.data);
  });

  const { setFilters, filterResults } = useContext(SearchFilterContext);

  const createTimeOut = (t, cb, ...args) => {
    return setTimeout(() => {
      cb.apply(null, args);
    }, t);
  };

  let timers = [];

  useEffect(() => {}, [query]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    const filterObj = {
      query: e.target.value,
      sortBy: sortByFilter,
      topics: topicFilter,
      countries: countryFilter,
      //   genders: null,
    };
    console.log("timers ln1: ", timers);
    if (timers) {
      console.log("timer ln2: ", timers);
      //   clearTimeout(timers);
    }
    timers.push(
      createTimeOut(
        3000,
        (filter) => {
          console.log(filter);
        },
        filterObj
      )
    );
    console.log("timer ln3: ", timers);

    // setTimeout(() => {
    //   const filterObj = {
    //     query: e.target.value,
    //     sortBy: sortByFilter,
    //     topics: topicFilter,
    //     countries: countryFilter,
    //     //   genders: null,
    //   };
    //   setFilters(filterObj);
    //   filterResults(filterObj);
    // }, 100);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleAddCountry = (value) => {
    if (!countryFilter.includes(value)) {
      setCountryFilter((prevCountryList) => [...prevCountryList, value]);
    }
  };

  const handleRemoveCountry = (value) => {
    setCountryFilter((prevCountryList) => {
      return prevCountryList.filter((country) => country !== value);
    });
  };

  const handleAddTopic = (value) => {
    if (!topicFilter.includes(value)) {
      setTopicFilter((prevTopicFilter) => [...prevTopicFilter, value]);
    }
  };

  const handleRemoveTopic = (value) => {
    setTopicFilter((prevTopicFilter) => {
      return prevTopicFilter.filter((topic) => topic !== value);
    });
  };

  const handleAddSort = (value) => {
    if (!sortByFilter.includes(value)) {
      setSortByFilter((prevSortByFilter) => [...prevSortByFilter, value]);
    }
  };

  const handleRemoveSort = (value) => {
    setSortByFilter((prevSortByFilter) => {
      return prevSortByFilter.filter((sortBy) => sortBy !== value);
    });
  };

  const handleShowResults = () => {
    /**
     * filters object should look like this
     * {
            query: null,
            sortBy: [],
            topics: [],
            countries: [],
            genders: [],
            isInstructor: ""
        }
     */

    const filterObj = {
      query: query,
      sortBy: sortByFilter,
      topics: topicFilter,
      countries: countryFilter,
      //   genders: null,
    };
    console.log("filterobj", filterObj);
    setFilters(filterObj);
    filterResults(filterObj);
    handleCloseModal();
  };

  return (
    <div className="search">
      <div className="input">
        <input
          type="search"
          placeholder="Search by company, role, name..."
          value={query}
          onChange={handleSearchInput}
        />
        <img src="imgs/2.svg" alt="icon" className="search-icon" />
      </div>
      <div className="available">
        <h5>Show only instructors</h5>
        <Switch />
      </div>
      <div className="filter">
        <div className="filter-slider">
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <img src="imgs/1.svg" alt="" />
            Filters
          </Button>
          <Modal
            title="Filters"
            open={openModal}
            width={445}
            footer={null}
            // onOk={handleOk}
            onCancel={handleCloseModal}
          >
            <Form
              form={form}
              name="control-hooks"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item name="sort">
                <div className="sort">
                  <p className="main-head">Sort by</p>
                  <Space wrap>
                    <Select
                      defaultValue={[]}
                      placeholder="Show All"
                      dropdownStyle={{ marginBottom: "10px" }}
                      mode="multiple"
                      bordered={false}
                      onSelect={(value) => {
                        handleAddSort(value);
                      }}
                      onDeselect={(value) => {
                        handleRemoveSort(value);
                      }}
                      options={[
                        {
                          value: "lowest hourly rate",
                          label: "lowest hourly rate",
                        },
                        {
                          value: "highest hourly rate",
                          label: "highest hourly rate",
                        },
                        {
                          value: "highest review",
                          label: "highest review",
                        },
                        {
                          value: "highest availability",
                          label: "highest availability",
                        },
                        {
                          value: "highest experience",
                          label: "highest experience",
                        },
                      ]}
                    />
                  </Space>
                </div>
              </Form.Item>

              <Form.Item name="topic">
                <div className="topic">
                  <p className="main-head">Filter by</p>
                  <Space wrap>
                    {topicList && (
                      <Select
                        defaultValue={[]}
                        placeholder="Topic"
                        mode="multiple"
                        style={{ width: "100%" }}
                        bordered={false}
                        onSelect={(value) => {
                          handleAddTopic(value);
                        }}
                        onDeselect={(value) => {
                          handleRemoveTopic(value);
                        }}
                        options={Array.from(topicList).map((topic) => {
                          return {
                            value: topic.name,
                            label: topic.name,
                          };
                        })}
                      />
                    )}
                  </Space>
                </div>
              </Form.Item>

              <Form.Item name="country">
                <div className="country">
                  <Space wrap>
                    <Select
                      defaultValue={countryFilter}
                      placeholder="Country"
                      mode="multiple"
                      style={{ width: "100%" }}
                      bordered={false}
                      onSelect={(value) => {
                        handleAddCountry(value);
                      }}
                      onDeselect={(value) => {
                        handleRemoveCountry(value);
                      }}
                      options={[
                        {
                          value: "Egypt",
                          label: "Egypt",
                        },
                        {
                          value: "Jordan",
                          label: "Jordan",
                        },
                      ]}
                    />
                  </Space>
                </div>
              </Form.Item>

              <Form.Item name="gender">
                <div className="gender">
                  <Space wrap>
                    <Select
                      defaultValue={[]}
                      placeholder="Gender"
                      mode="multiple"
                      style={{ width: "100%" }}
                      bordered={false}
                      options={[
                        {
                          value: "male",
                          label: "male",
                        },
                        {
                          value: "female",
                          label: "female",
                        },
                        {
                          value: "",
                          label: "both",
                        },
                      ]}
                    />
                  </Space>
                </div>
              </Form.Item>

              <Form.Item>
                <div className="result">
                  <Button className="main-btn res" onClick={handleShowResults}>
                    Show result
                  </Button>
                  <Button
                    className="main-btn"
                    htmlType="button"
                    style={{ backgroundColor: "#DDD", color: "#000" }}
                  >
                    Clear filters
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
