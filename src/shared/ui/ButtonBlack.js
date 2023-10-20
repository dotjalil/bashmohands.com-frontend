import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

export function ButtonBlack({ children, to }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#151515",
            defaultColor: "#FFFFFF",
            defaultBorderColor: "#151515",
            borderRadiusLG: "6px",
            colorPrimaryHover: "none",
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
