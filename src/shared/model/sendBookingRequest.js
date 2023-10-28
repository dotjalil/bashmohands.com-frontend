export default function sendBookingRequest({
  instructor,
  client,
  date,
  notes,
}) {
  // Request to server
  const res = {
    instructor,
    client,
    date,
    notes,
  };
  // Sending promise as a mimic to response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Server Request Resolved! with value: ", res);
      // if (name === "no") reject(new Error("You can't use that name"));
      resolve(res);
    }, 3000);
  });
}
