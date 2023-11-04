import { json } from "react-router-dom";

export default async function getFilteredUsers(filters, page = 1, limit = 8) {
  const filterObj = {
    filters: [
      { sorting: filters.sortBy || [] },
      { topics: filters.topics || [] },
      { country: filters.countries || [] },
      { gender: filters.genders || [] },
      { query: filters.query || "" },
      { isInstructor: "" },
    ],
  };
  console.log("filters", filterObj);
  let response;
  if (
    filterObj.filters[0].sorting.length === 0 &&
    filterObj.filters[1].topics.length === 0 &&
    filterObj.filters[2].country.length === 0 &&
    filterObj.filters[3].gender.length === 0 &&
    filterObj.filters[4].query.length === 0
  ) {
    response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}user/?page=${page}&limit=${limit}`
    );
  } else {
    response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}user/filter/?page=${page}&limit=${limit}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterObj),
      }
    );
  }

  if (!response.ok) {
    // Error handling
    throw json({ message: "Couldn't load users!" }, { status: 500 });
  } else {
    const resJson = await response.json();
    const data = resJson.data;
    console.log("data", data);
    return data;
  }
}
