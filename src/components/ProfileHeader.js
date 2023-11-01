import React from "react";
import "./ProfileHeader.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons/lib/icons";
import { ProfileOutlined } from "@ant-design/icons/lib/icons";
import { LogoutOutlined } from "@ant-design/icons/lib/icons";

const items = [
  {
    label: (
      <span>
        {" "}
        <SettingOutlined />
        <a href="#" className="profile-list">
          Profile setting
        </a>
      </span>
    ),
    key: "0",
  },
  {
    label: (
      <span style={{ padding: "20px 0" }}>
        <ProfileOutlined />
        <a href="#" className="profile-list">
          Account visibility
        </a>
      </span>
    ),
    key: "1",
  },
  {
    label: (
      <span>
        <UserOutlined />
        <a href="#" className="profile-list"></a>
        Be an instructor
      </span>
    ),
    key: "2",
  },
  {
    type: "divider",
  },
  {
    label: (
      <span>
        <LogoutOutlined />
        <a href="#" className="profile-list">
          Log out
        </a>
      </span>
    ),
    key: "3",
  },
];

export const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space
            style={{
              border: "1px solid #ddd",
              padding: "",
              height: "46px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "22px 10px",
              borderRadius: "40px",
              position: "relative",
            }}
            className="space"
          >
            <img src="imgs/avatar-05.png" alt="" className="profile-img" />
            <p className="username">Abdelrhman Elsayed</p>
            <DownOutlined style={{ color: "#000" }} className="down-list" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};
