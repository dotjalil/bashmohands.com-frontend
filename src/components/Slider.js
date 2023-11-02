import React, { useContext } from "react";
import "./Slider.css";
import ResponseDataContext from "../shared/contexts/responseDataContext";

export const Slider = () => {
  const { searchData, setsearchData } = useContext(ResponseDataContext);

  return (
    <div className="slider-up">
      <div onClick={() => handleFilter("React")}>
        <img src="imgs/4.svg" alt="" />
        <p>React</p>
      </div>
      <div onClick={() => handleFilter("Angular")}>
        <img src="imgs/3.svg" alt="" />
        <p>Angular</p>
      </div>
      <div onClick={() => handleFilter("Javascript")}>
        <img src="imgs/5.svg" alt="" />
        <p>Javascript</p>
      </div>
      <div onClick={() => handleFilter("Typescript")}>
        <img src="imgs/6.svg" alt="" />
        <p>Typescript</p>
      </div>
      <div onClick={() => handleFilter("SASS")}>
        <img src="imgs/3.svg" alt="" />
        <p>SASS</p>
      </div>
      <div onClick={() => handleFilter("C#")}>
        <img src="imgs/5.svg" alt="" />
        <p>C#</p>
      </div>
    </div>
  );

  function handleFilter(filter) {
    console.log(filter);
    const output = [
      { sorting: [] },
      { topics: [`${filter}`] },
      { country: [] },
      { gender: [] },
    ];

    const baseUrl = `http://localhost:5000/api/user/filter`;
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: output,
        users: searchData.data,
      }),
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
