import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

export function ButtonOutlined({ children, to }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadiusLG: "6px",
          },
        },
      }}
    >
      {to && (
        <Link to={to}>
          <Button size="large">{children}</Button>
        </Link>
      )}
      {!to && <Button size="large">{children}</Button>}
    </ConfigProvider>
  );
}
