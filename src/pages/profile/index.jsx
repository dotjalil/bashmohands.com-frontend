import React, { useState } from "react";
import "./index.css";

export const ProfilePage = () => {
  const [showContent, setSHowContent] = useState(false);

  const toggleHiddenContent = () => {
    setSHowContent(!showContent);
  };
  return (
    <div>
      <div className="cover">
        <div className="cover-img"></div>
        <div className="photo-name">
          <div className="img"></div>
          <div className="txt-container">
            <div className="txt">
              <p>Mona Essawy</p>
              <p>Software Engineer at Vodafone</p>
            </div>
            <div className="btns">
              <button className="call-btn">
                <img src="imgs/7.svg" alt="" />
                Schedule FREE Call
              </button>
              <button className="cv">
                <img src="imgs/8.svg" className="cv-img" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="about-exp">
        <div className="container">
          <div className="about">
            <p className="main-txt">about</p>
            <div className="about-txt">
              <p>
                Hello, I’m Mona and I have a passion about problem solving. With
                the over eight years of experience building and scaling human
                interface, I’ve worked in product design, product strategy
                across industries like SAAS, creative{" "}
                {showContent && (
                  <span className="hidden-content">
                    (marketing & advertisement) and traditional enterprise. I
                    mentor junior designers, take part in interviews and onboard
                    new team members.
                  </span>
                )}{" "}
                <button onClick={toggleHiddenContent} className="read-more">
                  read more...
                </button>
              </p>
              <div className="social">
                <img src="imgs/9.svg" alt="linkedin" />
                <img src="imgs/10.svg" alt="githup" />
                <img src="imgs/11.svg" alt="social" />
              </div>
            </div>
          </div>
          <div className="exp">
            <p className="main-txt">Disciplines & Expertise</p>
            <div className="exp-txt">
              <p>🔥 Free 30-min session</p>
              <p>🧑‍🏫 Teaching</p>
              <p>💼 Career Mentoring</p>
              <p>🧑‍🏫 Teaching</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
