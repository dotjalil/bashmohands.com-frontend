import React from "react";
import "./Footer.css";
import { Footer } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

export const MainFooter = () => {
  return (
    <Footer>
      <div className="footer">
        <div className="footer-logo">
          <Link to="/">
            <img
              alt="logo"
              src="/bashmohands-logo.svg"
              width="277"
              height="auto"
            />
          </Link>
          <p className="text">
            A free access to the most talented professionals in the Middle East
            and Africa. Join the wave!
          </p>
        </div>
        <div className="links">
          <ul>
            <li>Our Story</li>
            <li>Meet the team</li>
            <li>How it works</li>
          </ul>
          <ul>
            <li>Find instructor</li>
            <li>Become instructor</li>
          </ul>
        </div>
      </div>
      <div className="copyRight">
        <p>© Copyright 2023 - BashMohands.com</p>
        <p>Privacy Policy • Terms & Conditions</p>
      </div>
    </Footer>
  );
};
