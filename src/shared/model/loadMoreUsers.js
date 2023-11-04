import { json } from "react-router-dom";

export default async function loadMoreUsers(
  page = 2,
  filters = null,
  limit = 8
) {
  console.log(page);
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}user/?page=${page}&limit=${limit}`
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
