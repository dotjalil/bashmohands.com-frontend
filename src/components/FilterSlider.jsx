import React, { useState } from "react";
import { Dropdown, Checkbox, Space } from "antd";
import "./FilterSlider.css";

export const Filter = () => {
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [arrFilter, setArrFilter] = useState([]);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
    setArrFilter(checkedValues);
    console.log("Selected values:", checkedValues);
    console.log(arrFilter);
  };

  const topicFilters = (changeValue) => {
    console.log("1-" + changeValue[0]);
    console.log("2-" + arrFilter);
    if (arrFilter.includes(...changeValue)) {
      console.log("test");
      // setSelectedValues((prevValues) =>
      //   prevValues.filter((value) => value !== changeValue[0])
      // );
      setArrFilter((prevArr) =>
        prevArr.filter((value) => value !== changeValue[0])
      );
    } else {
      // setSelectedValues((prevValues) => [...prevValues, ...changeValue]);
      setArrFilter((prevArr) => [...prevArr, ...changeValue]);
    }
  };

  const items = [
    {
      key: "1",
      type: "group",
      label: <span style={{ fontWeight: "bold" }}>Topic</span>,
      children: [
        {
          key: "1-1",
          label: (
            <Checkbox.Group options={["topic 1"]} onChange={topicFilters} />
          ),
        },
        {
          key: "1-2",
          label: (
            <Checkbox.Group options={["topic 2"]} onChange={topicFilters} />
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
            <Checkbox.Group options={["country 1"]} onChange={topicFilters} />
          ),
        },
        {
          key: "2-2",
          label: (
            <Checkbox.Group options={["country 2"]} onChange={topicFilters} />
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
              onChange={topicFilters}
            />
          ),
        },
        {
          key: "3-2",
          label: (
            <Checkbox.Group
              options={["Sort by name (A - Z)"]}
              onChange={topicFilters}
            />
          ),
        },
        {
          key: "3-5",
          label: (
            <Checkbox.Group
              options={["Sort by name (Z - A)"]}
              onChange={topicFilters}
            />
          ),
        },
        {
          key: "3-3",
          label: (
            <Checkbox.Group
              options={["Sort by number of review"]}
              defaultValue={[""]}
              onChange={handleCheckboxChange}
            />
          ),
        },
        {
          key: "3-4",
          label: (
            <Checkbox.Group
              options={["Available soon"]}
              onChange={handleCheckboxChange}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={handleVisibleChange}
      overlay={
        <div
          style={{
            backgroundColor: "#fff",
            padding: "14px",
            borderRadius: "8px",
            boxShadow: "0px 4px 22px 0px rgba(218, 0, 92, 0.1)",
          }}
        >
          {items.map((item) => (
            <div key={item.key}>
              {item.type === "group" && (
                <div style={{ margin: "10px 0" }}>
                  <span style={{ fontWeight: "bold" }}>{item.label}</span>
                </div>
              )}
              {item.children &&
                item.children.map((child) => (
                  <div key={child.key}>{child.label}</div>
                ))}
              {item.type === "divider" && (
                <div
                  style={{ borderBottom: "1px solid #e8e8e8", margin: "8px 0" }}
                />
              )}
            </div>
          ))}
        </div>
      }
      trigger={["click"]}
    >
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
};
