import React from "react";
import { Dropdown, Checkbox, Space } from "antd";

const items = [
  {
    key: "1",
    type: "group",
    label: <span style={{ fontWeight: "bold" }}>Topic</span>,
    children: [
      {
        key: "1-1",
        label: (
          <Checkbox.Group
            options={["topic 1"]}
            defaultValue={["topic 1"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "1-2",
        label: (
          <Checkbox.Group
            options={["topic 2"]}
            defaultValue={["topic 2"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
    ],
  },
  {
    key: "2",
    type: "group",
    label: <span style={{ fontWeight: "bold" }}>Country</span>,
    children: [
      {
        key: "2-1",
        label: (
          <Checkbox.Group
            options={["country 1"]}
            defaultValue={["country 1"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "2-2",
        label: (
          <Checkbox.Group
            options={["country 2"]}
            defaultValue={["country 2"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "7",
    type: "group",
    label: <span style={{ fontWeight: "bold" }}>Sort by: </span>,
    children: [
      {
        key: "3-1",
        label: (
          <Checkbox.Group
            options={["Sort by hourly rate"]}
            defaultValue={["Sort by hourly rate"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "3-2",
        label: (
          <Checkbox.Group
            options={["Sort by name (A - Z)"]}
            defaultValue={["Sort by name (A - Z)"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "3-5",
        label: (
          <Checkbox.Group
            options={["Sort by name (Z - A)"]}
            defaultValue={["Sort by name (Z - A)"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "3-3",
        label: (
          <Checkbox.Group
            options={["Sort by number of review"]}
            defaultValue={["Sort by number of review"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
      {
        key: "3-4",
        label: (
          <Checkbox.Group
            options={["Available soon"]}
            defaultValue={["Available soon"]}
            onChange={(checkedValues) => {
              console.log("checked = ", checkedValues);
            }}
          />
        ),
      },
    ],
  },
];

export const Filter = () => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a onClick={(e) => e.preventDefault()}>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img src="imgs/1.svg" alt="" />
        <p style={{ color: "#000" }}>Filter</p>
      </Space>
    </a>
  </Dropdown>
);
