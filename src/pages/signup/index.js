import "./Style.css";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form as AntForm, Input } from "antd";
import {
  Link,
  Form,
  json,
  redirect,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export default function SignupPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const redirection = searchParams.get("redirect");

  return (
    <>
      <Form
        method="POST"
        action={`/signup?redirect=${redirection}`}
        className="signupForm"
      >
        <AntForm.Item style={{ marginBottom: 0 }}>
          <AntForm.Item
            label="First Name"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input placeholder="Your first name" name="firstName" />
          </AntForm.Item>
          <AntForm.Item
            label="Last Name"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              margin: "0 8px",
              marginRight: "0",
            }}
          >
            <Input placeholder="Your last name" name="lastName" />
          </AntForm.Item>
        </AntForm.Item>
        <AntForm.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input type="email" name="email" placeholder="Enter your email" />
        </AntForm.Item>
        <AntForm.Item
          label="Your username"
          rules={[{ required: true, message: "Please enter unique username!" }]}
        >
          <Input type="text" name="handler" placeholder="Must be unique" />
        </AntForm.Item>

        <AntForm.Item
          label="Password"
          rules={[{ required: true, message: "Enter Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </AntForm.Item>
        <AntForm.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: "16px" }}
            disabled={isSubmitting}
          >
            {isSubmitting && "Submitting"}
            {!isSubmitting && "Submit"}
          </Button>
          Do you have an account?{" "}
          <Link to={`/login?redirect=${redirection}`}>Login!</Link>
        </AntForm.Item>
      </Form>
      {/* </AntForm> */}
    </>
  );
}

export async function signupAction({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log(JSON.stringify(data));

  // catch the redirection url after signup
  const searchParams = new URL(request.url).searchParams;
  const redirection = searchParams.get("redirect");

  const response = await fetch(`${process.env.REACT_APP_BACKEND_API}user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.data.token;

  // Set expiration date to token
  const ttl = 7; // in days
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + ttl * 24);

  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expiration.toISOString());

  if (redirection && redirection !== "null") {
    return redirect(redirection);
  } else {
    return redirect("/");
  }
}
