import React from "react";
import { Modal } from "antd";
import { Descriptions } from "antd";
import "./SessionDrawer.css";
import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import getAuthData from "../shared/model/getAuthData";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const { user, token } = getAuthData();

const baseUrl = `${process.env.REACT_APP_BACKEND_API}session`;
// const baseUrl = `http://localhost:5000/api/session`;

function handleAprroveSession(sessionDetails) {
  fetch(`${baseUrl}/${sessionDetails.id}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
}
function handleDeclineSession(sessionDetails) {
  fetch(`${baseUrl}/${sessionDetails.id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
}
function handleRescheduleSession(sessionDetails) {
  fetch(`${baseUrl}/${sessionDetails.id}/rescedule`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
}

export default function SessionDetails({ isOpen, isClose, sessionDetails }) {
  console.log(
    "🚀 ~ file: SessionDrawer.js:13 ~ SessionDetails ~ sessionDetails:",
    sessionDetails
  );
  console.log("session topic", sessionDetails);
  const items = [
    {
      label: "Time",
      span: {
        xl: 2,
        xxl: 2,
      },
      children: sessionDetails?.date.split("T")[1].slice(0, 5),
    },
    {
      label: "Date",
      children: sessionDetails?.date.split("T")[0],
    },
    {
      label: "Notes",
      span: {
        xl: 3,
        xxl: 3,
      },
      children: sessionDetails?.notes,
    },
    {
      label: "Link",
      span: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 2,
        xxl: 2,
      },
      children: "http://localhost:3000/omarabdo/account",
    },
    {
      label: "Action",
      span: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 2,
        xxl: 2,
      },
      children: (
        <div className="btns">
          <Link to={`/${user.handler}/account/sessions`}>
            <button
              className="approve"
              onClick={() => {
                handleAprroveSession(sessionDetails);
              }}
            >
              <CheckOutlined />
            </button>
          </Link>

          <Link to={`/${user.handler}/account/sessions`}>
            <button
              className="cancel"
              onClick={() => {
                handleDeclineSession(sessionDetails);
              }}
            >
              <CloseOutlined />
            </button>
          </Link>
          <Link to={`/${user.handler}/account/sessions`}>
            <button
              className="reschedule"
              onClick={() => {
                handleRescheduleSession(sessionDetails);
              }}
            >
              <CalendarOutlined /> Rescheduale
            </button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div>
      {sessionDetails && (
        <Modal
          title="Details"
          className="session-modal"
          open={isOpen}
          onCancel={isClose}
          footer={null}
          width={1000}
        >
          <div className="modal">
            <div className="name">
              <div className="name-img">
                <div className="my-img">
                  <img src={sessionDetails.Client.photo} alt="" />
                </div>
                <div className="jop">
                  <p className="my-name">
                    {sessionDetails.Client.firstName +
                      " " +
                      sessionDetails.Client.lastName}
                  </p>
                  <p className="my-jop">{sessionDetails.title}</p>
                </div>
              </div>
              <div className="session-duration">
                <p className="s-duration">Session Duration</p>
                <span className="s-min">30 Minutes</span>
              </div>
              <div className="topic">
                <p>Topics</p>
                {/* Faulty code */}
                <span>{sessionDetails.Client.topics}</span>
              </div>
              <div className="status">
                <p>Status</p>
                <span>{sessionDetails.status}</span>
              </div>
            </div>
            <div className="date-time">
              <Descriptions layout="vertical" bordered items={items} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
