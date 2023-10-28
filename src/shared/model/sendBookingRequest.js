export default function sendBookingRequest({
  instructorHandler,
  clientHandler,
  date,
  notes,
}) {
  // Request to server
  const res = {
    instructorHandler,
    clientHandler,
    date,
    notes,
    // topics
  };
  // Sending promise as a mimic to response
  return fetch(`${process.env.REACT_APP_BACKEND_API}session/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instructorHandler,
      clientHandler,
      date,
      notes,
      topics: [],
    }),
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("Server Request Resolved! with value: ", res);
  //     // if (name === "no") reject(new Error("You can't use that name"));
  //     resolve(res);
  //   }, 3000);
  // });
}
