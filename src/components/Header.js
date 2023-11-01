import "./Header.css";
// import { useState } from "react";
import {
  Link,
  useNavigation,
  useLocation,
  useRouteLoaderData,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Layout, Menu, ConfigProvider, Row, Col, Drawer } from "antd";
import { ButtonOutlined, UserHeaderBtn } from "../shared/ui";
import { ButtonBlack } from "../shared/ui/ButtonBlack";
import { MenuOutlined } from "@ant-design/icons";
import AccountLayout, { AsideCom } from "../app/layouts/accountLayout";
const { Header } = Layout;

const MainNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  // Routing progress bar setup
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  // fallback route
  let currentRoute = "root";
  // check if current route is {id: profile}
  const routeMatches = useMatches();
  const isProfile = routeMatches.some((route) => {
    return route.id === "profile";
  });
  // if public profile, fetch auth data from 'profile' route loader
  // else, fallback to 'root'
  if (isProfile) {
    currentRoute = "profile";
  }

  // check if login token exists
  const authData = useRouteLoaderData(currentRoute);

  useEffect(() => {
    NProgress.start();
    if (navigation.state === "idle") NProgress.done();
  }, [location, navigation.state]); // Watch for router location

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#fff",
            headerHeight: 100,
          },
          Menu: {
            activeBarHeight: 0,
            itemColor: "#17080E",
            itemSelectedColor: "#17080E",
          },
        },
      }}
    >
      <Header
        className="header"
        id="baseLayoutHeader"
        theme="light"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          alignItems: "center",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row>
          <Col span={8}>
            <div>
              <Link to="/">
                <img
                  alt="logo"
                  src="/bashmohands-logo.svg"
                  width="277"
                  height="auto"
                  className="logo-img"
                />
              </Link>
            </div>
          </Col>
          <Col span={8}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              items={[
                {
                  key: "/",
                  label: "Home",
                },
                {
                  key: "/1",
                  label: "User",
                },
              ]}
              onSelect={({ key, keyPath, selectedKeys, domEvent }) => {
                navigate(key);
              }}
            >
              {/* <Menu.Item key="1">
                <Link to="/" style={{ fontSize: "16px" }}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/1" style={{ fontSize: "16px" }}>
                  User
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/1/account" style={{ fontSize: "16px" }}>
                  User Account
                </Link>
              </Menu.Item> */}
            </Menu>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            className="profile-logo"
          >
            {authData && authData.token && authData.user && (
              <UserHeaderBtn
                firstName={authData.user.firstName}
                lastName={authData.user.lastName}
                photo={authData.user.photo}
                handler={authData.user.handler}
              />
            )}
            {(!authData || !authData.token || !authData.user) && (
              <div className="authHeaderBtns">
                <ButtonOutlined to="/login">Login</ButtonOutlined>
                <ButtonBlack to="/signup">Signup</ButtonBlack>
              </div>
            )}
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            className="bars"
          >
            <Drawer
              className="drower"
              open={openMenu}
              closable={true}
              onClose={() => {
                setOpenMenu(false);
              }}
            >
              <Menu>
                <AsideCom />
              </Menu>
            </Drawer>
            <MenuOutlined
              className="bars"
              onClick={() => {
                setOpenMenu(true);
              }}
            />
          </Col>
        </Row>
      </Header>
    </ConfigProvider>
  );
};

export default MainNav;
