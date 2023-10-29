export default function getUserProfileURL(hanlder) {
  console.log("env url", process.env.PUBLIC_URL);
  return process.env.PUBLIC_URL + hanlder;
}
