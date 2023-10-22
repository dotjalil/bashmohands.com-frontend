import { Button } from "antd";
import supabase from "../../shared/model/supabaseClient";
import { Link, useRouteLoaderData } from "react-router-dom";

export default function Account() {
  const { user } = useRouteLoaderData("root");

  return (
    <div>
      <h1>Welcome 👋</h1>
      <p>You don't have any upcoming sessions</p>
      <Link to="/">
        <Button>Browse Instructors</Button>
      </Link>
    </div>
  );
}

// export async function accountDataLoader({ request }) {
//   const handler = new URL(request.url);
//   console.log("handler", handler);
//   let { data, error } = await supabase.from("Users").select("*").eq("id", 1);
//   console.log("data", data);
//   if (error) throw new Error("db connection failed");
//   return data;
// }
