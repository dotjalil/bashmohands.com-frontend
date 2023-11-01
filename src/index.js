import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SearchDataContext from "./shared/providers/searchDataContext";
import FilterContextProvider from "./shared/providers/filtersProvider";
import UsersContextProvider from "./shared/providers/allUsersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <SearchDataContext>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </SearchDataContext>
    </UsersContextProvider>
  </React.StrictMode>
);
