import React from "react";
import "./Search.css";
import { Switch } from "antd";
import { Filter } from "./FilterSlider";

const Search = () => {
  return (
    <div className="up-div">
      <div className="input">
        <input type="search" placeholder="Search by company, role, name..." />
        <img src="imgs/2.svg" alt="icon" className="search-icon" />
      </div>
      <div className="available">
        <h5>Show only available instructors</h5>
        <Switch defaultChecked />
      </div>
      <div className="filter">
        <Filter />
      </div>
    </div>
  );
};
export default Search;
