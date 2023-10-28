import "./About.css";
import { Row, Col } from "antd";
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
                <img src="imgs/9.svg" alt="linkedin" />
                <img src="imgs/10.svg" alt="githup" />
                <img src="imgs/11.svg" alt="social" />
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
