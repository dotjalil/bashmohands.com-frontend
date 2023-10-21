import { redirect } from "react-router-dom";

export function getAuthData() {
  const authData = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };
  return authData;
}

export function userAuthLoader() {
  const authData = getAuthData();
  return authData;
}

export function checkAuthLoader({ request }) {
  const authData = getAuthData();
  const token = authData.token;
  if (!token) {
    return redirect(`/signup?redirect=${request.url}`);
  }
  return null;
}
