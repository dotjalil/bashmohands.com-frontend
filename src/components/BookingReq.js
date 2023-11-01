import React, { useState } from "react";
import "./BookingReq.css";
import { Button, Flex, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import SessionDetails from "./SessionDrawer";

export const BookingReq = ({ penddingSessions }) => {
  console.log(
    "🚀 ~ file: BookingReq.js:8 ~ BookingReq ~ penddingSessions:",
    penddingSessions
  );
  const [isOpen, setIsOpen] = useState(false);
  const [modelDetails, setModelDetails] = useState(null);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dataSource =
    penddingSessions &&
    penddingSessions.map((session, index) => ({
      key: index,
      img: (
        <div className="table-img">
          <img src={session.Client.photo} alt="img" />
          <p>{session.clientHandler}</p>
        </div>
      ),
      time: session.date.split("T")[1].slice(0, 5),
      date: session.date.split("T")[0],
      status: session.status,
      showDetails: (
        <Button
          onClick={() => {
            console.log("Session", session);
            openModal();
            setModelDetails(session);
          }}
        >
          Session details
        </Button>
      ),
    }));

  const columns = [
    {
      title: "img",
      dataIndex: "img",
      key: "img",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "showDetails",
      dataIndex: "showDetails",
      key: "showDetails",
    },
  ];
  return (
    <section style={{ paddingTop: "35px" }}>
      <Flex align="baseline" justify="space-between">
        <h2 style={{ color: "#4e4e4e" }} className="booking-req">
          Booking request
        </h2>
        <Link to="/sesssions">All sessions</Link>
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        scroll={{ x: 580 }}
        className="booking-table"
      ></Table>
      <SessionDetails
        isOpen={isOpen}
        isClose={closeModal}
        sessionDetails={modelDetails}
      />
    </section>
  );
};
