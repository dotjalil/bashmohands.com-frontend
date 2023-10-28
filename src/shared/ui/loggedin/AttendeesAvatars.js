import { Flex, Avatar } from "antd";
import { Link } from "react-router-dom";

export default function AttendeesAvatars({ attendees }) {
  return (
    <Flex align="center" gap={16}>
      <Avatar.Group
        maxCount={2}
        size="large"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        {attendees.length > 0 &&
          attendees.map((attendee) => {
            return (
              <div key={attendee.handler}>
                {attendee.avatar && <Avatar src={attendee.avatar} />}
                {!attendee.avatar && (
                  <Avatar style={{ backgroundColor: "#f56a00" }}>M</Avatar>
                )}
              </div>
            );
          })}
      </Avatar.Group>
      <span>
        <strong>You</strong>, and{" "}
        <strong>
          <Link to={`/${attendees[attendees.length - 1].handler}`}>
            {attendees[attendees.length - 1].firstName}
          </Link>
        </strong>
      </span>
    </Flex>
  );
}
