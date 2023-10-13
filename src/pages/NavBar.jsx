import React, { useState } from "react";
import { Anchor, Drawer, Button, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

function AppMenu({ isInline = false }) {
  return (
    <Menu
      triggerSubMenuAction="true"
      inlineIndent={30}
      // mode={isInline ? "inline" : "horizontal"}
      items={[
        {
          label: "Home",
          key: "home",
        },
        {
          label: "Instructors",
          key: "instructors",
        },
        {
          label: "My Session",
          key: "session",
        },
      ]}
    ></Menu>
  );
}
export let NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  let el = document.querySelector(".ant-menu-submenu");
  el?.parentNode?.removeChild(el);
  return (
    <div className="flex items-center justify-between nav container mx-auto">
      <div className="italic title font-bold font-medium second-color cursor-pointer">
        <span className="main-color">bash</span>mohands.
        <span className="text-base font-normal">com</span>
      </div>

      <span className="headerMenu">
        <AppMenu isInlineCollapsed inlineCollapsedWidth={300} />
      </span>

      <Drawer
        className="drow"
        open={openMenu}
        closable={true}
        onClose={() => {
          setOpenMenu(false);
        }}
      >
        <AppMenu isInline />
      </Drawer>

      <div className="flex items-center">
        <div className="flex rounded-3xl border justify-center items-center cursor-pointer nav-prof duration-300	">
          <div className="img pr-3">
            <img
              src="imgs/cat-02.jpg"
              className="logo-img rounded-full nav-img"
              alt=""
            />
          </div>
          <div className="nav-name">Abdelrhman Elsayed</div>
        </div>
        <div className="menuIcon">
          <MenuOutlined
            onClick={() => {
              setOpenMenu(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
