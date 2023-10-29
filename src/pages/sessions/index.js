import { Flex, Table, Tag, Button } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Link, useRouteLoaderData } from "react-router-dom";
import AttendeesAvatars from "../../shared/ui/loggedin/AttendeesAvatars";
import SessionDetails from "../../components/SessionDrawer";
import { useState } from "react";

const { Column } = Table;

export default function SessionsPage() {
  const [open, setOpen] = useState(false);
  const drawerOnOff = () => setOpen(!open);

  const sessions = [
    {
      id: 1,
      instructor: {
        firstName: "Mona",
        handler: "instructorHandler",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      },
      attendees: [
        {
          firstName: "Mohamed",
          handler: "attendeeHandler",
          // avatar: "attendeeAvatar",
        },
      ],
      status: "pending",
      date: "Sat, 29 Jan 2023",
      time: "12:00-12:30 PM",
      topics: ["JavaScript", "ReactJS"],
    },
    {
      id: 1,
      instructor: {
        firstName: "Maha",
        handler: "instructorHandler",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      },
      attendees: [
        {
          firstName: "Mohamed",
          handler: "attendeeHandler",
          // avatar: "attendeeAvatar",
        },
      ],
      status: "confirmed",
      date: "Sat, 29 Jan 2023",
      time: "12:00-12:30 PM",
      topics: ["Ajax", "jQuery"],
    },
    {
      id: 1,
      instructor: {
        firstName: "Mansour",
        handler: "instructorHandler",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
      },
      attendees: [
        {
          firstName: "Mohamed",
          handler: "attendeeHandler",
          // avatar: "attendeeAvatar",
        },
      ],
      status: "cancelled",
      date: "Sat, 29 Jan 2023",
      time: "12:00-12:30 PM",
      topics: ["JavaScript", "ReactJS"],
    },
  ];

  return (
    <>
      <h1>Sessions</h1>
      <p>You don't have any sessions to attend/give</p>
      <AllSessions sessions={sessions} onDetails={drawerOnOff} />
      <SessionDetails open={open} drawerOnOff={drawerOnOff} />
    </>
  );
}

function AllSessions({ sessions, onDetails }) {
  const { user } = useRouteLoaderData("root");

  const sessionsData = sessions.map((session, i) => {
    return {
      key: i,
      attendees: (
        <AttendeesAvatars
          attendees={[session.attendees[0], session.instructor]}
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
      status: "confirmed",
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
