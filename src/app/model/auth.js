import { redirect } from "react-router-dom";

export function getAuthToken() {
  // const token = localStorage.getItem("a_token");
  const token = "hi";
  return token;
}

export function tokenLoader() {
  //   return getAuthToken();
}

export function checkAuthLoader() {
  console.log("auth loader");
  const token = getAuthToken();

  if (!token) {
    return redirect("/signup");
  }

  return true;
}
