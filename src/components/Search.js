import React, { useEffect, useState } from "react";
import { LockOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col } from "antd";
import "./Search.css";

const Search = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Row style={{ width: "100%" }}>
        <Col span={12}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              className="searchbox"
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Search by company, role, name..."
              style={{
                height: "66px",
                borderRadius: "12px",
                fontSize: "16px",
                padding: "17px 22px",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={18}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !clientReady ||
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Log in
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
export default Search;
