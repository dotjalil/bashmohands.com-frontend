export default function getAuthData() {
  // extract auth data from local storage
  const authData = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };
  return authData;
}
