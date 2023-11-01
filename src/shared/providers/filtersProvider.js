import React, { createContext, useEffect, useState } from "react";
import FiltersContext from "../contexts/filtersContext";

const FilterContextProvider = ({ children }) => {
  const [filtersData, setFiltersData] = useState("");
  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_BACKEND_API}topic`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "🚀 ~ file: filtersProvider.js:15 ~ .then ~ data:",
          data.data
        );
        const filtersNames = data.data.map((filter) => filter.name);
        setFiltersData(filtersNames);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  return (
    <FiltersContext.Provider value={{ filtersData, setFiltersData }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FilterContextProvider;
