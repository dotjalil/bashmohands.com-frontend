import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import { Layout } from "antd";
import MainNav from "../../components/Header";
=======
import { ConfigProvider, Layout } from "antd";
import MainNav from "../../components/Header";
import { MainFooter } from "../../components/Footer";
>>>>>>> omar-filter_search

const { Content } = Layout;

export default function BaseLayout() {
  // const [showModel, setShow]
  return (
    <div>
<<<<<<< HEAD
      <MainNav />
      <Content style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Outlet />
      </Content>
=======
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
>>>>>>> omar-filter_search
    </div>
  );
}
