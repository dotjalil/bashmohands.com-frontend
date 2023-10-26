import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import MainNav from "../../components/Header";
import { MainFooter } from "../../components/Footer";

const { Content } = Layout;

export default function BaseLayout() {
  // const [showModel, setShow]
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#DA005C",

            // Alias Token
            // colorBgContainer: "#f6ffed",
          },
        }}
      >
        <MainNav />
        <Content style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <Outlet />
        </Content>
        <MainFooter />
      </ConfigProvider>
    </div>
  );
}
