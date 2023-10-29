import React, { createContext, useContext, useState } from "react";
import "./Search.css";
import { Switch } from "antd";
import { Filter } from "./FilterSlider";
import SearchDataContext from "../shared/contexts/searchDataContext";
import ResponseDataContext from "../shared/contexts/responseDataContext";

const Search = () => {
  const [searchQuery, setsearchQuery] = useState("");
  // const [responseData, setResponseData] = useState(null);
  const { searchData, setsearchData } = useContext(ResponseDataContext);

  const sendPostRequest = () => {
    console.log(searchQuery);
    const baseUrl = `https://bashmohands.onrender.com/api/user/search?k=${searchQuery}`;
    // const baseUrl = `http://localhost:5000/api/user/search?k=${searchQuery}`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log(data);
        setsearchData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (event) => {
    setsearchQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    sendPostRequest();
  };

  const handleShowInstructorsBtn = (checked) => {
    if (checked) {
      const baseUrl = `https://bashmohands.onrender.com/api/user/instructors`;
      // const baseUrl = `http://localhost:5000/api/user/instructors`;
      fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("🚀 ~ file: FilterSlider.jsx:56 ~ .then ~ data:", data);
          // Handle the response data as needed
          // setsearchData(data);
          console.log(
            "🚀 ~ file: FilterSlider.jsx:59 ~ .then ~ data.data:",
            data.data
          );
          setsearchData({ data: data.data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const baseUrl = `https://bashmohands.onrender.com/api/user`;
      // const baseUrl = `http://localhost:5000/api/user`;
      fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("🚀 ~ file: FilterSlider.jsx:56 ~ .then ~ data:", data);
          // Handle the response data as needed
          // setsearchData(data);
          console.log(
            "🚀 ~ file: FilterSlider.jsx:59 ~ .then ~ data.data:",
            data.data
          );
          setsearchData({ data: data.data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="up-div">
      <div className="input">
        <input
          type="search"
          placeholder="Search by company, role, name..."
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <img src="imgs/2.svg" alt="icon" className="search-icon" />
      </div>
      <div className="available">
        <h5>Show only available instructors</h5>
        <Switch onChange={handleShowInstructorsBtn} />
      </div>
      <div className="filter">
        <Filter />
      </div>
    </div>
  );
};

export default Search;
