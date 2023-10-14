import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import Header from "../../components/Header";
import { FOoter } from "../../components/Footer";

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
        <Header />
        <Content style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <Outlet />
        </Content>
        <FOoter />
      </ConfigProvider>
    </div>
  );
}
