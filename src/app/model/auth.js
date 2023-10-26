<<<<<<< HEAD
import { matchPath, redirect } from "react-router-dom";

export function getAuthData() {
  // extract auth data from local storage
=======
import { redirect } from "react-router-dom";

export function getAuthData() {
>>>>>>> omar-filter_search
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
<<<<<<< HEAD
  if (!authData.token || !authData.user) {
    return redirect(`/signup?redirect=${request.url}`);
  }
  return null;
}

export function isAuthMineLoader({ request }) {
  // get localStorage auth
  const authData = getAuthData();
  const { token, user } = authData;

  // if no token, redirect me to login/signup
  if (!token) {
    return redirect(`/signup?redirect=${request.url}`);
  }

  // get hanlder from url
  const pathname = new URL(request.url).pathname;
  const matchpath = matchPath({ path: "/:handler/account/*" }, pathname);
  const urlHandler = matchpath.params.handler;

  // Check if handler from url doesn't match localStorage's
  if (urlHandler.localeCompare(user.handler) !== 0) {
    // if not same, throw error
    console.log("You're NOT Authorized!");
    throw new Error(
      "Authentication Error! Login to your account and try again!"
    );
  } else {
    // if identical, proceed to the route
    return null;
  }
=======
  const token = authData.token;
  if (!token) {
    return redirect(`/signup?redirect=${request.url}`);
  }
  return null;
>>>>>>> omar-filter_search
}
