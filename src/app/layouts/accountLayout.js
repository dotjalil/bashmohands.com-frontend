import { Outlet, useNavigate, useRouteLoaderData } from "react-router";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export default function AccountLayout() {
  const navigate = useNavigate();
  const { user } = useRouteLoaderData("root");

  function getItem(label, key, icon, children) {
    return { key, icon, children, label };
  }

  const items = [
    getItem("Home", `/${user.handler}/account`, <HomeOutlined />),
    getItem(
      "Sessions",
      `/${user.handler}/account/sessions`,
      <DesktopOutlined />
    ),
    getItem("Test", "1", <DesktopOutlined />),
  ];

  return (
    <>
      <Layout
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0",
          background: "#ffffff",
        }}
      >
        <Sider
          style={{
            borderRight: "1px solid #F1F1F1",
            padding: "65px 25px 0 0",
            background: "#ffffff",
            height: "100%",
          }}
          width={200}
        >
          <Menu
            mode="inline"
            style={{ height: "100%", border: "none" }}
            items={items}
            defaultSelectedKeys={[`/${user.handler}/account`]}
            onSelect={({ key, keyPath, selectedKeys, domEvent }) => {
              console.log(
                "menu",
                "key",
                key,
                "keypath",
                keyPath,
                "selectedkeys",
                selectedKeys,
                "domevent",
                domEvent
              );
              navigate(key);
            }}
          />
        </Sider>
        <Content style={{ padding: "65px 25px 0 25px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}
