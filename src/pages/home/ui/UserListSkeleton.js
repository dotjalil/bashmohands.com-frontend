import { Col, Row, Skeleton } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";

export default function UserListSkeleton() {
  return (
    <Row>
      <Col span={6} style={{ padding: "10px" }}>
        <SkeletonButton block active style={{ height: "280px" }} />
        <Skeleton active />
      </Col>
      <Col span={6} style={{ padding: "10px" }}>
        <SkeletonButton block active style={{ height: "280px" }} />
        <Skeleton active />
      </Col>
      <Col span={6} style={{ padding: "10px" }}>
        <SkeletonButton block active style={{ height: "280px" }} />
        <Skeleton active />
      </Col>
      <Col span={6} style={{ padding: "10px" }}>
        <SkeletonButton block active style={{ height: "280px" }} />
        <Skeleton active />
      </Col>
    </Row>
  );
}
