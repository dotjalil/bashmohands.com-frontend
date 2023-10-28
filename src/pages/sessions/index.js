import { Flex, Table, Tag, Button } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Link, useRouteLoaderData } from "react-router-dom";
import AttendeesAvatars from "../../shared/ui/loggedin/AttendeesAvatars";
import SessionDetails from "../../components/SessionDrawer";
import { useEffect, useState } from "react";
import getAuthData from "../../shared/model/getAuthData";

const { Column } = Table;

export default function SessionsPage() {
  const [open, setOpen] = useState(false);
  const [userSessions, setUsreSessions] = useState([]);
  const [userState, setuserState] = useState("");

  const drawerOnOff = () => setOpen(!open);

  const { user } = getAuthData();
  const { handler } = user;
  console.log(handler);
  const getUserSessions = () => {
    // const baseUrl = `https://bashmohands.onrender.com/api/session/${loggedInUser.handler}`;
    const baseUrl = `${process.env.REACT_APP_BACKEND_API}session/${handler}`;
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: index.js:30 ~ .then ~ data:", data.data);
        setUsreSessions(data.data);

        data.data[0].clientHandler === handler
          ? setuserState("client")
          : setuserState("instructor");
        console.log(
          "🚀 ~ file: index.js:49 ~ .then ~ data.data.clientHandler === loggedInUser.handler:",
          data.data.clientHandler,
          handler
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getUserSessions();
  }, []);

  console.log("🚀 ~ file: index.js:54 ~ sessions ~ userSession:", userSessions);
  const sessions = userSessions.map((userSession) => {
    return {
      id: userSession.id,
      instructor: {
        firstName: userSession.instructorHandler,
        handler: "instructorHandler",
        avatar: userSession.Instructor.photo,
      },
      client: {
        firstName: userSession.clientHandler,
        handler: "attendeeHandler",
        avatar: userSession.Client.photo,
      },
      status: userSession.status,
      date: userSession.date.split("T")[0],
      time: userSession.date.split("T")[1],
      topics: ["JavaScript", "ReactJS"],
    };
  });

  // const sessions = [
  //   {
  //     id: 1,
  //     instructor: {
  //       firstName: "Mona",
  //       handler: "instructorHandler",
  //       avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
  //     },
  //     attendees: [
  //       {
  //         firstName: "Mohamed",
  //         handler: "attendeeHandler",
  //         // avatar: "attendeeAvatar",
  //       },
  //     ],
  //     status: "pending",
  //     date: "Sat, 29 Jan 2023",
  //     time: "12:00-12:30 PM",
  //     topics: ["JavaScript", "ReactJS"],
  //   },
  //   {
  //     id: 1,
  //     instructor: {
  //       firstName: "Maha",
  //       handler: "instructorHandler",
  //       avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
  //     },
  //     attendees: [
  //       {
  //         firstName: "Mohamed",
  //         handler: "attendeeHandler",
  //         // avatar: "attendeeAvatar",
  //       },
  //     ],
  //     status: "confirmed",
  //     date: "Sat, 29 Jan 2023",
  //     time: "12:00-12:30 PM",
  //     topics: ["Ajax", "jQuery"],
  //   },
  //   {
  //     id: 1,
  //     instructor: {
  //       firstName: "Mansour",
  //       handler: "instructorHandler",
  //       avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
  //     },
  //     attendees: [
  //       {
  //         firstName: "Mohamed",
  //         handler: "attendeeHandler",
  //         // avatar: "attendeeAvatar",
  //       },
  //     ],
  //     status: "cancelled",
  //     date: "Sat, 29 Jan 2023",
  //     time: "12:00-12:30 PM",
  //     topics: ["JavaScript", "ReactJS"],
  //   },
  // ];

  return (
    <>
      <h1>Sessions</h1>
      <p>You don't have any sessions to attend/give</p>
      <AllSessions
        sessions={sessions && sessions}
        onDetails={drawerOnOff}
        userState={userState}
      />
      <SessionDetails open={open} drawerOnOff={drawerOnOff} />
    </>
  );
}

function AllSessions({ sessions, onDetails, userState }) {
  const { user } = useRouteLoaderData("root");

  const sessionsData = sessions.map((session, i) => {
    return {
      key: i,
      attendees: (
        <AttendeesAvatars
          attendees={
            userState == "client"
              ? [session.client, session.instructor]
              : [session.instructor, session.client]
          }
        />
      ),

      topics: session.topics,
      date: session.date,
      time: session.time,
      status: <SessionStatus status={session.status} />,
      action: (
        // <Link to={`/${user.handler}/session/${session.id}`}>
        <Button onClick={onDetails}>Details</Button>
        // </Link>
      ),
    };
  });
  return (
    <section style={{ paddingTop: "35px" }}>
      <Table dataSource={sessionsData} pagination={false}>
        <Column
          style={{ padding: "0" }}
          title="Attendees"
          dataIndex="attendees"
          key="attendees"
        />
        {/* <Column
          title="Topics"
          dataIndex="topics"
          key="topics"
          render={(topics) => (
            <>
              {topics.map((topic) => (
                <Tag color="red" key={topic}>
                  {topic}
                </Tag>
              ))}
            </>
          )}
        /> */}
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Time" dataIndex="time" key="time" />
        <Column title="Details" dataIndex="action" key="action" />
      </Table>
    </section>
  );
}

function SessionStatus({ status }) {
  const badges = [
    {
      status: "pending",
      element: (
        <Tag icon={<ClockCircleOutlined />} color="default">
          waiting
        </Tag>
      ),
    },
    {
      status: "deliverd",
      element: (
        <Tag icon={<CheckCircleOutlined />} color="success">
          confirmed
        </Tag>
      ),
    },
    {
      status: "cancelled",
      element: (
        <Tag icon={<MinusCircleOutlined />} color="error">
          error
        </Tag>
      ),
    },
  ];
  return badges.filter((badge) => badge.status === status)[0].element;
}
