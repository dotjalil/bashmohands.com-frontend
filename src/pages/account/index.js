import {
  Button,
  Table,
  Tag,
  Flex,
  Avatar,
  ConfigProvider,
  Drawer,
  Space,
} from "antd";
import { Link, useRouteLoaderData } from "react-router-dom";
import AttendeesAvatars from "../../shared/ui/loggedin/AttendeesAvatars";
import { useEffect, useState } from "react";
import SessionDetails from "../../components/SessionDrawer";
import { BookingReq } from "../../components/BookingReq";
import getAuthData from "../../shared/model/getAuthData";

const { Column } = Table;

const { user, token } = getAuthData();
export default function Account() {
  const { user } = useRouteLoaderData("root");

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <h1>Welcome 👋</h1>
      <p>You don't have any upcoming sessions</p>
      <Link to="/">
        <Button>Browse Instructors</Button>
      </Link>
      <UpcomingSessions openModal={openModal} />
      <BookmarkedConnections />
      <SessionDetails isOpen={isOpen} isClose={closeModal} />
    </div>
  );
}

function UpcomingSessions({ openModal }) {
  const [penddingSessions, setPenddingSessions] = useState("");

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_BACKEND_API}session/${user.handler}/pendding`;
    // const baseUrl = `http://localhost:5000/api/session/${user.handler}/pendding`;

    fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ddddddddddddddd", data);
        setPenddingSessions([...data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);

  const sessions = [
    {
      id: 1,
      instructor: {
        firstName: "Mona",
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
      topics: ["JavaScript", "ReactJS"],
    },
  ];
  const sessionsData = sessions.map((session, i) => {
    return {
      key: i,
      attendees: (
        <AttendeesAvatars
          attendees={[session.attendees[0], session.instructor]}
        />
      ),

      topics: session.topics,
      action: (
        // <Link to={`/session/${session.id}`}>
        <Button onClick={openModal}>Session details</Button>
        // </Link>
      ),
    };
  });
  return (
    <section style={{ paddingTop: "35px" }}>
      <Flex align="baseline" justify="space-between">
        <h2 style={{ color: "#4e4e4e" }} className="upcoming">
          Upcoming Sessions
        </h2>
        <Link to="/sesssions">All sessions</Link>
      </Flex>
      <Table
        dataSource={sessionsData}
        pagination={false}
        showHeader={false}
        scroll={{ x: 580 }}
      >
        <Column
          style={{ padding: "0" }}
          title="Attendees"
          dataIndex="attendees"
          key="attendees"
        />
        <Column
          title="Session Topics"
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
        />
        <Column title="Action" dataIndex="action" key="action" />
      </Table>
      {console.log("User Topic", user)}
      {user.role === "INSTRUCTOR" && (
        <BookingReq penddingSessions={penddingSessions} />
      )}
    </section>
  );
}

function BookmarkedConnections() {
  const users = [
    {
      firstName: "Hassan",
      lastName: "Kamel",
      title: "Front-End Engineer",
      company: "Vodafone",
      topics: ["JavaScript", "NodeJS"],
      handler: "/hassan",
    },
    {
      firstName: "Jim",
      lastName: "Green",
      title: "Product Manager",
      company: "Vodafone",
      topics: ["JavaScript", "ReactJS"],
      handler: "/moji4",
    },
    {
      firstName: "Joe",
      lastName: "Black",
      title: "Product Manager",
      company: "Vodafone",
      topics: ["TypeScript", "Angular"],
      handler: "/moji6",
    },
  ];
  const usersData = users.map((user, i) => {
    return {
      key: i,
      userInfo: (
        <UserAvatar
          key={user.handler}
          firstName={user.firstName}
          lastName={user.lastName}
          avatar={user.avatar}
          title={user.title}
          company={user.company}
        />
      ),
      topics: user.topics,
      action: (
        <Link to={user.handler}>
          <Button type="link">View profile</Button>
        </Link>
      ),
    };
  });
  return (
    <section style={{ paddingTop: "35px" }}>
      <Flex align="baseline" justify="space-between">
        <h2 style={{ color: "#4e4e4e" }} className="bookmarked">
          Bookmarked connections
        </h2>
        <Link to="/sesssions">Find instructor</Link>
      </Flex>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: "transparent",
              cellPaddingInline: 0,
              cellPaddingInlineMD: 0,
              cellPaddingInlineSM: 0,
            },
          },
        }}
      >
        <Table
          dataSource={usersData}
          showHeader={false}
          pagination={false}
          scroll={{ x: 580 }}
        >
          <Column
            style={{ padding: "0" }}
            title="User Details"
            dataIndex="userInfo"
            key="userInfo"
          />
          <Column
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
          />
          <Column title="Action" dataIndex="action" key="action" />
        </Table>
      </ConfigProvider>
    </section>
  );
}

function UserAvatar({ firstName, lastName, avatar, title, company }) {
  return (
    <Flex vertical={false} gap={10}>
      <Avatar
        size={{ xs: 16, sm: 10, md: 20, lg: 44, xl: 60, xxl: 80 }}
        src={
          avatar ||
          "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
        }
      />
      <Flex vertical={true} justify="center">
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          {firstName + " " + lastName}
        </div>
        <div style={{ color: "#343434" }}>{title + " at " + company}</div>
      </Flex>
    </Flex>
  );
}

// export async function accountDataLoader({ request }) {
//   const handler = new URL(request.url);
//   console.log("handler", handler);
//   let { data, error } = await supabase.from("Users").select("*").eq("id", 1);
//   console.log("data", data);
//   if (error) throw new Error("db connection failed");
//   return data;
// }
