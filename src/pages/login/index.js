import "./Style.css";
import { LockOutlined } from "@ant-design/icons";
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { Button, Form as AntForm, Input } from "antd";

export default function LoginPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const redirection = searchParams.get("redirect");

  return (
    <>
      <Form
        className="loginForm"
        method="POST"
        action={`/login?redirect=${redirection}`}
      >
        {data && data.message && (
          <p style={{ textAlign: "center" }}>{data.message}</p>
        )}
        <AntForm.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input type="email" name="email" placeholder="Enter your email" />
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
            {!isSubmitting && "Log in"}
          </Button>
          Or <Link to={`/signup?redirect=${redirection}`}>register now!</Link>
        </AntForm.Item>
      </Form>
    </>
  );
}

export async function loginFormAction({ request }) {
  const data = Object.fromEntries(await request.formData());
  const searchParams = new URL(request.url).searchParams;
  const redirection = searchParams.get("redirect");

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}auth/signin/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  // if (response.status === 422 || response.status === 401) {
  //   console.log("4xx error");
  //   return response;
  // }

  if (!response.ok) {
    console.log("Request failed");
    return json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const user = resData.data.user;
  const token = resData.data.token;

  // Set expiration date to token
  const ttl = 7; // in days
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + ttl * 24);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("expiration", expiration.toISOString());

  if (redirection && redirection !== "null") {
    // when the ?redirect= is not empty
    return redirect(redirection);
  } else {
    return redirect("/");
  }
}
