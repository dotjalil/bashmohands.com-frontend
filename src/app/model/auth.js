import { redirect } from "react-router-dom";

export function getAuthToken() {
  //   const token = localStorage.getItem("token");
  //   return token;
}

export function tokenLoader() {
  //   return getAuthToken();
}

export function checkAuthLoader() {
  console.log("auth loader");
  var token;
  //   const token = getAuthToken();

  if (!token) {
    return redirect("/signup");
  }
}
