import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Select, Space, Form } from "antd";
import "./FilterSlider.css";
import ResponseDataContext from "../shared/contexts/respondDataContext";
const { Option } = Select;

export const Filter = () => {
  const [form] = Form.useForm();

  const { searchData, setsearchData } = useContext(ResponseDataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    sort: [],
    topic: [],
    country: [],
    gender: [],
  });
  const [getSort, setSort] = useState([]);
  const [getTopic, setTopic] = useState([]);
  const [getCountry, setCountry] = useState([]);
  const [getGender, setGender] = useState([]);
  useEffect(() => {
    setSelectedValues([]);
  }, []);
  useEffect(() => {
    setSelectedValues([getSort, getTopic, getCountry, getGender]);
  }, [getSort, getTopic, getCountry, getGender]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let result = () => {
    let output = [];
    output.push(
      { sorting: getSort },
      { topics: getTopic },
      { country: getCountry },
      { gender: getGender }
    );
    // const baseUrl = `https://bashmohands.onrender.com/api/user/filter`;
    const baseUrl = `http://localhost:5000/api/user/filter`;
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: output,
        users: searchData.data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: FilterSlider.jsx:56 ~ .then ~ data:", data);
        // Handle the response data as needed
        // setsearchData(data);
        console.log(
          "🚀 ~ file: FilterSlider.jsx:59 ~ .then ~ data.data:",
          data.data
        );
        setsearchData({ data: data.data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleCancel();
    console.log(output);
  };

  const clear = () => {
    setSort([]);
    setTopic([]);
    setCountry([]);
    setGender([]);
    onReset();
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <img src="imgs/1.svg" alt="" />
        Filters
      </Button>
      <Modal
        title="Filters"
        open={isModalOpen}
        width={445}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item name="sort">
            <div className="sort">
              <p className="main-head">Sort by</p>

              <Space wrap>
                <Select
                  defaultValue={[]}
                  placeholder="Show All"
                  dropdownStyle={{ marginBottom: "10px" }}
                  mode="multiple"
                  bordered={false}
                  onSelect={(value) => {
                    if (!getSort.includes(value)) {
                      setSort((prevSort) => [...prevSort, value]);
                    }
                  }}
                  onDeselect={(value) => {
                    setSort((prevSort) =>
                      prevSort.filter((item) => item !== value)
                    );
                  }}
                  options={[
                    {
                      value: "Sort by hourly rate",
                      label: "Sort by hourly rate",
                    },
                    {
                      value: "Highest review",
                      label: "Highest review",
                    },
                    {
                      value: "Availability",
                      label: "Availability",
                    },
                    {
                      value: "Highest experience",
                      label: "Highest experience",
                    },
                  ]}
                />
              </Space>
            </div>
          </Form.Item>

          <Form.Item name="topic">
            <div className="topic">
              <p className="main-head">Filter by</p>
              <Space wrap>
                <Select
                  defaultValue={[]}
                  placeholder="Topic"
                  mode="multiple"
                  style={{ width: "100%" }}
                  bordered={false}
                  onSelect={(value) => {
                    if (!getTopic.includes(value)) {
                      setTopic((prevTopic) => [...prevTopic, value]);
                    }
                  }}
                  onDeselect={(value) => {
                    setTopic((prevSort) =>
                      prevSort.filter((item) => item !== value)
                    );
                  }}
                  options={[
                    {
                      value: "Topic 1",
                      label: "Topic 1",
                    },
                    {
                      value: "Topic 2",
                      label: "Topic 2",
                    },
                  ]}
                />
              </Space>
            </div>
          </Form.Item>

          <Form.Item name="country">
            <div className="country">
              <Space wrap>
                <Select
                  defaultValue={[]}
                  placeholder="Country"
                  mode="multiple"
                  style={{ width: "100%" }}
                  bordered={false}
                  onSelect={(value) => {
                    if (!getCountry.includes(value)) {
                      setCountry((prevCountry) => [...prevCountry, value]);
                    }
                  }}
                  onDeselect={(value) => {
                    setCountry((prevSort) =>
                      prevSort.filter((item) => item !== value)
                    );
                  }}
                  options={[
                    {
                      value: "Egypt",
                      label: "Egypt",
                    },
                    {
                      value: "Jordan",
                      label: "Jordan",
                    },
                  ]}
                />
              </Space>
            </div>
          </Form.Item>

          <Form.Item name="gender">
            <div className="gender">
              <Space wrap>
                <Select
                  defaultValue={[]}
                  placeholder="Gender"
                  mode="multiple"
                  style={{ width: "100%" }}
                  bordered={false}
                  onSelect={(value) => {
                    if (!getGender.includes(value)) {
                      setGender((prevGender) => [...prevGender, value]);
                    }
                  }}
                  onDeselect={(value) => {
                    setGender((prevSort) =>
                      prevSort.filter((item) => item !== value)
                    );
                  }}
                  options={[
                    {
                      value: "male",
                      label: "male",
                    },
                    {
                      value: "female",
                      label: "female",
                    },
                    {
                      value: "both",
                      label: "both",
                    },
                  ]}
                />
              </Space>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="result">
              <Button className="main-btn res" onClick={result}>
                Show result
              </Button>
              {(getSort.length > 0 ||
                getTopic.length > 0 ||
                getCountry.length > 0 ||
                getGender.length > 0) && (
                <Button
                  className="main-btn"
                  htmlType="button"
                  style={{ backgroundColor: "#DDD", color: "#000" }}
                  onClick={() => {
                    clear();
                    onReset();
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
