import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SearchDataContext from "./shared/providers/searchDataContext";
import FilterContextProvider from "./shared/providers/filtersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchDataContext>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </SearchDataContext>
  </React.StrictMode>
);
