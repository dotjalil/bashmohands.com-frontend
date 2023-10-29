import { Flex, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { Link, useRouteLoaderData } from "react-router-dom";

export default function ProfileSettingsPage({ handler }) {
  const { user } = useRouteLoaderData("root");

  return (
    <Flex align="center" justify="space-between">
      <h1>My Profile</h1>
      <Link to={`/${user.handler}`} target="_blank">
        <Button type="text">
          View public profile <ExportOutlined />
        </Button>
      </Link>
    </Flex>
  );
}
