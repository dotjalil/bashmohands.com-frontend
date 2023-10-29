import "./About.css";
import { Row, Col } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function About({ bio }) {
  return (
    <div className="about-exp">
      <Row>
        <Col span={16}>
          <div className="about">
            <p className="main-txt">about</p>
            <div className="about-txt">
              <p>{bio}</p>
              <div className="social">
                <Link
                  to="https://github.com"
                  target="_blank"
                  style={{
                    padding: "15px",
                    background: "#FFF4F9",
                    borderRadius: "100%",
                  }}
                >
                  <GithubOutlined
                    style={{ fontSize: "18px", color: "#000000" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="exp">
            <p className="main-txt">Disciplines & Expertise</p>
            <div className="exp-txt">
              <p>🔥 Free 30-min session</p>
              <p>🧑‍🏫 Teaching</p>
              <p>💼 Career Mentoring</p>
              <p>🧑‍🏫 Teaching</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
