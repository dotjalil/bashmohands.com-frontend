import { Button, message } from "antd";
import Search from "../../components/Search";

export default function HomePage() {
  const [messageApi, contextHolder] = message.useMessage();

  function showNotification() {
    messageApi.open({
      type: "success",
      content: "This is a prompt message with custom className and style",
      className: "custom-class",
      style: {
        marginTop: "80vh",
      },
    });
  }

  return (
    <div style={{ paddingTop: "65px" }}>
      <h1 style={{ fontSize: "34px", marginBottom: "32px" }}>
        Search instructors
      </h1>
      <Search />
      {contextHolder}
      <Button onClick={showNotification}>Click me</Button>
    </div>
  );
}
