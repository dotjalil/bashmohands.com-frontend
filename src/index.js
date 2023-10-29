import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SearchDataContext from "./shared/contexts/searchDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchDataContext>
      <App />
    </SearchDataContext>
  </React.StrictMode>
);
