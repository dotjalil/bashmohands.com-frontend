<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
=======
import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SearchDataContext from "./shared/contexts/searchDataContext";
>>>>>>> omar-filter_search

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <SearchDataContext>
      <App />
    </SearchDataContext>
>>>>>>> omar-filter_search
  </React.StrictMode>
);
