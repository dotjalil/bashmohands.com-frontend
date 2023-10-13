// import css
import "./UserList.css";

// import ui elements
import { Card, Col, Row } from "antd";
const { Meta } = Card;

export default function UserList({ users }) {
  return (
    <Row gutter={20}>
      {users.map((user) => (
        <Col span={6} key={user.id}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src={user.profile_pic}
                style={{ borderRadius: "5px" }}
              />
            }
          >
            <Meta
              title={`${user.first_name} ${user.last_name}`}
              description={`${user.job_title} at ${user.company}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
