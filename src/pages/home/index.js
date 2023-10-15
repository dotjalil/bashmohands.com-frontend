// import {  message } from "antd";
import Search from "../../components/Search";
import { useLoaderData } from "react-router-dom";
import supabase from "../../shared/model/Supabase";
import UserList from "../../components/UserList";

export default function HomePage() {
  // const [messageApi, contextHolder] = message.useMessage();
  const users = useLoaderData();

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
      <h1 style={{ fontSize: "34px", marginBottom: "32px" }}>
        Search instructors
      </h1>
      <Search />
      <UserList users={users} />
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
