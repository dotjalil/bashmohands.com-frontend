import React, { createContext, useEffect, useState } from "react";
import UsersContext from "../contexts/allUsersContext";

const UsersContextProvider = ({ children }) => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    const baseUrl = `https://bashmohands.onrender.com/api/user?page=1&limit=12`;
    // const baseUrl = `http://localhost:5000/api/user?page=1&limit=12`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
