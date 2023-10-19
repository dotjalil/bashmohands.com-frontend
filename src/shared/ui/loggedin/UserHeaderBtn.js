import "./UserHeaderBtn.css";
import { Button } from "antd";

function UserHeaderBtn() {
  return (
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
      <img
        alt="avatar"
        src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
        width={35}
        height={35}
        style={{ borderRadius: "35px" }}
      />
      Mohamed Abduljalil
    </Button>
  );
}

export { UserHeaderBtn };
