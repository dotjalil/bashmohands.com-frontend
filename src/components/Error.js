import { useAsyncError } from "react-router";

export default function ErrorElement() {
  const error = useAsyncError();
  return (
    <>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
    </>
  );
}
