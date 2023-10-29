import { matchPath, redirect } from "react-router-dom";
import getAuthData from "../../shared/model/getAuthData";

export function userAuthLoader() {
  const authData = getAuthData();
  return authData;
}

export function checkAuthLoader({ request }) {
  const authData = getAuthData();
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
}
