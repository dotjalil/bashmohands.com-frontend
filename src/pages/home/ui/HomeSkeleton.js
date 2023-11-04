import { Col, Row, Skeleton } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";

export default function HomeSkeleton() {
  return (
    <div>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <Skeleton.Input active style={{ marginBottom: "16px" }} />
          <Skeleton.Input block active />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <SkeletonButton block active style={{ height: "280px" }} />
          <Skeleton active />
        </Col>
        <Col span={6}>
          <SkeletonButton block active style={{ height: "280px" }} />
          <Skeleton active />
        </Col>
        <Col span={6}>
          <SkeletonButton block active style={{ height: "280px" }} />
          <Skeleton active />
        </Col>
        <Col span={6}>
          <SkeletonButton block active style={{ height: "280px" }} />
          <Skeleton active />
        </Col>
      </Row>
    </div>
  );
}
