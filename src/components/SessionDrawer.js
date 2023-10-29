import { Drawer, Space, Button } from "antd";

export default function SessionDetails({ open, drawerOnOff }) {
  return (
    <Drawer
      title={`large Drawer`}
      placement="right"
      size="large"
      onClose={drawerOnOff}
      open={open}
      extra={
        <Space>
          <Button onClick={drawerOnOff}>Cancel</Button>
          <Button type="primary" onClick={drawerOnOff}>
            OK
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
