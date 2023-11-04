import "./index.css";
// import {  message } from "antd";
import Search from "../../components/Search";
// import { useLoaderData } from "react-router-dom";
// import supabase from "../../shared/model/supabaseClient";
// import UserList from "../../components/UserList";
import { Slider } from "../../components/Slider";
import { Cards } from "../../components/Cards";
import { Pagination } from "antd";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import UsersContext from "../../shared/contexts/allUsersContext";
import { defer, useLoaderData, json, Await } from "react-router-dom";
import UserList from "./ui/UserList";
import UserListSkeleton from "./ui/UserListSkeleton";
import SetQuery from "./ui/SetQuery";
import SearchFilter from "./ui/SearchFilter";
import HomeSkeleton from "./ui/HomeSkeleton";
import HomeHeader from "./ui/HomeHeader";
// import { Filter } from "../../components/FilterSlider";

export default function HomePage() {
  const { data } = useLoaderData();

  return (
    <div style={{ paddingTop: "65px" }}>
      <Suspense fallback={<HomeSkeleton />}>
        <Await resolve={data} errorElement={<p>Something went wrong!</p>}>
          {(users) => (
            <>
              <HomeHeader />
              <UserList users={users} />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function asyncHomeLoader() {
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}user/?page=1&limit=8`
  );

  if (!response.ok) {
    // Error handling
    throw json({ message: "Couldn't load users!" }, { status: 500 });
  } else {
    const resJson = await response.json();
    const data = resJson.data;
    return data;
  }
}

export async function homePageLoader({ request }) {
  return defer({
    data: asyncHomeLoader(),
  });
}
