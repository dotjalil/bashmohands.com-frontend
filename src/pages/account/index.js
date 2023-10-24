import { Button, Table, Tag, Flex, Avatar, ConfigProvider } from "antd";
import { Link, useRouteLoaderData } from "react-router-dom";
import AttendeesAvatars from "../../shared/ui/loggedin/AttendeesAvatars";

const { Column } = Table;

export default function Account() {
  const { user } = useRouteLoaderData("root");

  return (
    <div>
      <h1>Welcome 👋</h1>
      <p>You don't have any upcoming sessions</p>
      <Link to="/">
        <Button>Browse Instructors</Button>
      </Link>
      <UpcomingSessions />
      <BookmarkedConnections />
    </div>
  );
}

function UpcomingSessions() {
  const sessions = [
    {
      id: 1,
      instructor: {
        firstName: "Mona",
        handler: "instructorHandler",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
        topics: ["JavaScript", "ReactJS"],
      },
      attendees: [
        {
          firstName: "Mohamed",
          handler: "attendeeHandler",
          // avatar: "attendeeAvatar",
        },
      ],
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

      topics: session.instructor.topics,
      action: (
        <Link to={`/session/${session.id}`}>
          <Button>Session details</Button>
        </Link>
      ),
    };
  });
  return (
    <section style={{ paddingTop: "35px" }}>
      <Flex align="baseline" justify="space-between">
        <h2 style={{ color: "#4e4e4e" }}>Upcoming Sessions</h2>
        <Link to="/sesssions">All sessions</Link>
      </Flex>
      <Table dataSource={sessionsData} pagination={false}>
        <Column
          style={{ padding: "0" }}
          title="Attendees"
          dataIndex="attendees"
          key="attendees"
        />
        <Column
          title="Instructor's Experience"
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
    </section>
  );
}

function BookmarkedConnections() {
  const users = [
    {
      firstName: "John",
      lastName: "Brown",
      title: "Product Manager",
      company: "Vodafone",
      topics: ["JavaScript", "NodeJS"],
      handler: "/moji4",
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
          <Button type="link" primary>
            View profile
          </Button>
        </Link>
      ),
    };
  });
  return (
    <section style={{ paddingTop: "35px" }}>
      <Flex align="baseline" justify="space-between">
        <h2 style={{ color: "#4e4e4e" }}>Bookmarked connections</h2>
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
        <Table dataSource={usersData} showHeader={false} pagination={false}>
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
