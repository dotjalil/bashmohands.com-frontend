import { Skeleton, Row, Col } from "antd";

export default function ProfileSkeleton() {
  return (
    <div>
      <div
        style={{
          height: "170px",
          width: "100%",
          background: "rgba(0,0,0,.06)",
        }}
      ></div>
      <div style={{ padding: "0 50px" }}>
        <Row style={{ marginTop: "25px" }}>
          <Col span={6}>
            <Skeleton
              active
              avatar={{ active: true, shape: "circle", size: "large" }}
              paragraph={false}
            />
          </Col>
          <Col span={10}></Col>
          <Col span={8}></Col>
        </Row>
        <Row style={{ marginTop: "65px" }}>
          <Col span={8}>
            <Skeleton active paragraph={true} title={true} />
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Skeleton active paragraph={true} title={true} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
