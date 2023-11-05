import { redirect } from "react-router-dom";

export default function ThankYouPage() {
  return <h1>Thank You</h1>;
}

export async function thankYouPageLoader({ request }) {
  console.log("request", request);
  const searchParams = new URL(request.url).searchParams;
  const user = searchParams.get("user");
  const uniqueIdentifier = searchParams.get("uniqueIdentifier");

  const sendBookingRequest = await fetch(
    `http://localhost:5000/api/pay/success?uniqueIdentifier=${uniqueIdentifier}`,
    {
      method: "GET",
    }
  );
  const res = await sendBookingRequest.json();
  console.log("res", res);

  return redirect(`http://localhost:3000/${user}/account/sessions`);
}
