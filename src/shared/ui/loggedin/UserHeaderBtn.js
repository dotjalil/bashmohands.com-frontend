import { Link } from "react-router-dom";
import "./UserHeaderBtn.css";
import { Button } from "antd";

function UserHeaderBtn({ firstName, lastName, photo, handler }) {
  return (
    <Link to={`/${handler}/account`}>
      <Button
        type="default"
        shape="round"
        size={"small"}
        style={{
          display: "flex",
          paddingLeft: "15px",
          gap: "5px",
          height: "46px",
          alignItems: "center",
          padding: "5px",
          paddingRight: "15px",
        }}
      >
        {photo && (
          <img
            alt="avatar"
            src={photo}
            width={35}
            height={35}
            style={{ borderRadius: "35px" }}
          />
        )}
        {!photo && (
          <img
            alt="avatar"
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
            width={35}
            height={35}
            style={{ borderRadius: "35px" }}
          />
        )}
        {firstName + " " + lastName}
      </Button>
    </Link>
  );
}

export { UserHeaderBtn };
