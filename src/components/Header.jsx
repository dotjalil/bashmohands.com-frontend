import "./Header.css";
// import { useState } from "react";
import { Link, useNavigation, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Layout, Menu, ConfigProvider, Row, Col, Button, Drawer } from "antd";
import { ProfileHeader } from "./ProfileHeader";
import { MenuOutlined } from "@ant-design/icons";
const { Header } = Layout;

const MainNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  // Routing progress bar setup
  const navigation = useNavigation();
  const location = useLocation();

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
                  className="logo"
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
            >
              <Menu.Item key="1" className="links">
                <Link to="/" style={{ fontSize: "16px" }}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/umo" style={{ fontSize: "16px" }}>
                  Instructors
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/uho" style={{ fontSize: "16px" }}>
                  My Sessions
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            className="profile-nav"
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ProfileHeader />
            <Drawer
              className="drow"
              open={openMenu}
              closable={true}
              onClose={() => {
                setOpenMenu(false);
              }}
            >
              <Menu mode="vertical" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <Link to="/" style={{ fontSize: "16px" }}>
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/umo" style={{ fontSize: "16px" }}>
                    Instructors
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/uho" style={{ fontSize: "16px" }}>
                    My Sessions
                  </Link>
                </Menu.Item>
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
