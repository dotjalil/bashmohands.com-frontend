import "./index.css";
// import {  message } from "antd";
import Search from "../../components/Search";
// import { useLoaderData } from "react-router-dom";
// import supabase from "../../shared/model/supabaseClient";
// import UserList from "../../components/UserList";
import { Slider } from "../../components/Slider";
import { Cards } from "../../components/Cards";
import { Pagination } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import UsersContext from "../../shared/contexts/allUsersContext";

export default function HomePage() {
  const { users, setUsers } = useContext(UsersContext);
  const [dbLength, setdbLength] = useState("");

  // const [messageApi, contextHolder] = message.useMessage();
  // const users = useLoaderData();

  // function showNotification() {
  //   messageApi.open({
  //     type: "success",
  //     content: "This is a prompt message with custom className and style",
  //     className: "custom-class",
  //     style: {
  //       marginTop: "80vh",
  //     },
  //   });
  // }

  useEffect(() => {
    const baseUrl = `https://bashmohands.onrender.com/api/user`;
    // const baseUrl = `http://localhost:5000/api/user/page=1&limit=12`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        setdbLength(data.data.length);
        console.log(
          "🚀 ~ file: index.js:44 ~ .then ~ data.data.dbLength:",
          data.data.length
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div style={{ paddingTop: "65px" }}>
      <h1
        style={{ fontSize: "34px", marginBottom: "32px" }}
        className="heading"
      >
        Search instructors
      </h1>
      <Search />
      <Slider />
      <Cards />
      {/* <button className="card-btn">Load more instructors</button> */}
      <Pagination
        style={{ marginBlock: 50, marginInlineStart: "40%" }}
        defaultCurrent={1}
        total={dbLength}
        defaultPageSize={12}
        onChange={(pageNumber) => {
          getNextPage(pageNumber);
        }}
      />
    </div>
  );

  async function getNextPage(pageNumber) {
    const baseUrl = `https://bashmohands.onrender.com/api/user/?page=${pageNumber}&limit=12`;
    // const baseUrl = `http://localhost:5000/api/user/?page=${pageNumber}&limit=${12}`;
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
  }
}

export async function homePageLoader() {
  // // let { data, error } = await supabase
  // //   .from("Users")
  // //   .select("*")
  // //   .order("created_at", { ascending: false });
  // if (error) throw new Error("db connection failed");
  // return data;
  return "";
}
