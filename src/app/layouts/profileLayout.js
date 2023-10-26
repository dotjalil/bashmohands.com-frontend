import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import MainNav from "../../components/Header";

const { Content } = Layout;

export default function ProfileLayout() {
  // const [showModel, setShow]
  return (
    <div>
      <MainNav />
      {/* <Content style={{ paddingLeft: "50px", paddingRight: "50px" }}> */}
      <Outlet />
      {/* </Content> */}
    </div>
  );
}
