import "./index.css";
// import {  message } from "antd";
import Search from "../../components/Search";
// import { useLoaderData } from "react-router-dom";
import supabase from "../../shared/model/supabaseClient";
// import UserList from "../../components/UserList";
import { Slider } from "../../components/Slider";
import { Cards } from "../../components/Cards";

export default function HomePage() {
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
      <button className="card-btn">Load more instructors</button>
    </div>
  );
}

export async function homePageLoader() {
  let { data, error } = await supabase
    .from("Users")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("db connection failed");
  return data;
}
