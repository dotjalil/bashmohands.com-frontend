import { useEffect, useState } from "react";
import { Button, Form, Input, ConfigProvider } from "antd";

{
}

export default function NameSetting({ initialValue }) {
  // NameSetting States
  const [settingStatus, setSettingStatus] = useState("locked");
  const [name, setName] = useState(initialValue);
  const [newName, setNewName] = useState(name);

  function handleCancel() {
    setSettingStatus("locked");
  }

  // Set temp value until change
  useEffect(() => {
    setNewName(name);
  }, [name]);

  // Request to server
  function httpChangeName(name) {
    // Sending promise as a mimic to response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Server Request Resolved! with value: ", name);
        if (name === "no") reject(new Error("You can't use that name"));
        resolve(name);
      }, 3000);
    });
  }

  // Form is submitted
  async function onSave(newName) {
    setSettingStatus("pending");
    setNewName(newName);
    try {
      const res = await httpChangeName(newName);
      setName(res);
    } catch (err) {
      setNewName(name);
      console.log(err);
    }
    setSettingStatus("complete");
  }

  // define LockScreen element
  const LockScreenElement = ({ value }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Name</p>
        <p>{value || "N/A"}</p>
      </div>
      <Button type="link" onClick={() => setSettingStatus("editing")}>
        Edit
      </Button>
    </div>
  );

  return (
    <>
      {/**
       * if locked,
       *  <LockScreen value />
       * else if editing,
       *  <SettingForm locked={false} />
       * else if pending,
       *  <SettingForm locked={false}>
       * else if complete
       *  <LockScreen value />
       */}

      {(settingStatus === "locked" || settingStatus === "complete") && (
        <LockScreenElement value={name} />
      )}
      {settingStatus === "editing" && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "22px",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelFontSize: 18,
                },
              },
            }}
          >
            <SettingForm
              initialValue={name}
              locked={false}
              onSave={onSave}
              setSettingStatus={setSettingStatus}
            />
          </ConfigProvider>
          <Button type="link" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
      {settingStatus === "pending" && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "22px",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelFontSize: 18,
                },
              },
            }}
          >
            <SettingFormInactive newValue={newName} />
          </ConfigProvider>
        </div>
      )}
    </>
  );
}

function SettingForm({ initialValue, locked, setSettingStatus, onSave }) {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState(initialValue);

  // Fix updating input value when setting status is pending
  //   useEffect(() => {
  //     setFormState()
  //   }, []);

  // handlers
  const handleInputChange = (e) => {
    setFormState(e.target.value);
  };
  const handleSubmit = () => {
    setSettingStatus("pending");
    // onSave(formState);
    if (onSave) onSave(formState);
  };

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 350 }}>
      <Form.Item label="Full Name">
        <Input
          onChange={(e) => {
            handleInputChange(e);
          }}
          id="name"
          placeholder="Enter your name"
          defaultValue={initialValue}
          disabled={locked}
          //   value={formState.name}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit} disabled={locked}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function SettingFormInactive({ newValue }) {
  console.log("Render Inactive Form");
  const [form] = Form.useForm();
  const [newName, setNewName] = useState(newValue);
  // Fix updating input value when setting status is pending
  //   useEffect(() => {
  //     setFormState()
  //   }, []);

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 350 }}>
      <Form.Item label="Full Name">
        <Input
          id="name"
          placeholder="Enter your name"
          defaultValue={newName}
          disabled={true}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" disabled={true}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
