import supabase from "../../shared/model/supabaseClient";
import { useLoaderData } from "react-router-dom";

export default function Account() {
  const data = useLoaderData();

  return <div>Account Page</div>;
}

export async function accountDataLoader() {
  let { data, error } = await supabase.from("Users").select("*").eq("id", 1);
  console.log("data", data);
  if (error) throw new Error("db connection failed");
  return data;
}
