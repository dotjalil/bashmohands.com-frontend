import React, { createContext, useState } from "react";
import ResponseDataContext from "./respondDataContext";

const SearchDataContext = ({ children }) => {
  const [searchData, setsearchData] = useState("");

  return (
    <ResponseDataContext.Provider value={{ searchData, setsearchData }}>
      {children}
    </ResponseDataContext.Provider>
  );
};

export default SearchDataContext;
