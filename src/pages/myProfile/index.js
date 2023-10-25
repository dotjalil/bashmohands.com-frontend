import { Avatar, Button, Flex, Modal, message, Upload, Collapse } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import NameSetting from "../../components/profile/settings/NameSetting";
// delete
import LockedSetting from "../../shared/ui/loggedin/LockedSetting";

// Initialize profile info
const initProfileInfo = {
  profilePhoto: null,
  name: "Undefined Name",
  country: null,
  about: null,
  age: null,
  topics: null,
};

export default function ProfileSettingsPage() {
  // profile form states
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState(initProfileInfo);

  // handlers
  const handleOpenPhotoModal = () => setShowPhotoModal(true);
  const handleClosePhotoModal = () => setShowPhotoModal(false);

  const handleChangeName = (name) => {
    console.log("name", name);
    setProfileInfo({
      ...profileInfo,
      name: name,
    });
  };

  // const handleChangeAbout = (value) => {
  //   setProfileInfo({
  //     ...profileInfo,
  //     about: value.about,
  //   });
  // };

  // Listen to each profile info change.
  useEffect(() => {
    // What happens when the user changes a profile info?
    // First update profileInfo state

    // Server request, etc...
    console.log("ProfileInfo useEffect!", "profileInfo", profileInfo);
  }, [profileInfo]);

  const userPhoto =
    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg";

  return (
    <>
      <h1>My Profile</h1>
      <Flex style={{ maxWidth: "200px" }} vertical={true}>
        <Avatar
          size={{ xs: 75, sm: 100, md: 150, lg: 200, xl: 200, xxl: 100 }}
          src={userPhoto}
        />
        <Button onClick={handleOpenPhotoModal}>Change Photo</Button>
      </Flex>

      <UploadProfilePhotoModal
        show={showPhotoModal}
        close={handleClosePhotoModal}
      />

      <NameSetting initialValue={profileInfo.name} onSave={handleChangeName} />
      <NameSetting initialValue={profileInfo.name} onSave={handleChangeName} />
      <NameSetting initialValue={profileInfo.name} onSave={handleChangeName} />
      <NameSetting initialValue={profileInfo.name} onSave={handleChangeName} />
      <NameSetting initialValue={profileInfo.name} onSave={handleChangeName} />

      {/* <LockedSetting
        title="About"
        type="longTextSetting"
        lockScreen={profileInfo.about}
        fields={[
          {
            name: "about",
            label: "About You",
            placeHolder: "Tell us about yourself!",
            value: profileInfo.about,
          },
        ]}
        onSubmit={handleChangeAbout}
      /> */}
    </>
  );
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function UploadProfilePhotoModal({ show, close }) {
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Modal
      title="Upload a new profile photo"
      open={show}
      onOk={close}
      okText="Submit"
      onCancel={close}
      maskClosable={false}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Modal>
  );
}
