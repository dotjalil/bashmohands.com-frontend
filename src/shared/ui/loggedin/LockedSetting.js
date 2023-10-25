import React, { useEffect, useState } from "react";
import { Select, Button, Form, Input, Radio, ConfigProvider } from "antd";

export default function LockedSetting({
  title,
  type,
  fields,
  onSave,
  lockScreen,
  disabled,
}) {
  const [locked, setLocked] = useState(true);

  const handleUnlockSetting = () => setLocked(false);
  const handleLockSetting = () => setLocked(true);

  const LockScreenElement = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>{title}</p>
        <p>{lockScreen || "N/A"}</p>
      </div>
      <Button type="link" onClick={handleUnlockSetting}>
        Edit
      </Button>
    </div>
  );
  return (
    <>
      {locked && <LockScreenElement />}
      {!locked && (
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
            {/**
             * Support more setting types by adding them here
             * type === "newType"
             */}
            {type === "textSetting" && (
              <TextInputSetting
                fields={fields}
                disabled={disabled}
                onSave={(value) => {
                  onSave(value);
                  setLocked(true);
                }}
              />
            )}
            {type === "longTextSetting" && (
              <LongTextInputSetting
                fields={fields}
                disabled={disabled}
                onSave={(value) => {
                  onSave(value);
                }}
              />
            )}
          </ConfigProvider>

          {/**
           * Add your supported types also here
           * type !== "newType"
           */}
          {(!type ||
            (type !== "textSetting" && type !== "longTextSetting")) && (
            <p>Undefined setting type!</p>
          )}
          <Button type="link" onClick={handleLockSetting}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}

function TextInputSetting({ fields, onSave, disabled }) {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState(null);

  // Initialize form state
  useEffect(() => {
    // only runs once to populate inputs
    console.log("Initializing form", formState);
    fields.map((field) =>
      setFormState({
        ...formState,
        [field.name]: field.value,
      })
    );
    console.log("AFTER Initializing form", formState);
  }, []);

  // handlers
  const handleTextValuesChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = () => {
    onSave(formState);
  };

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 350 }}>
      {fields.map((field) => (
        <Form.Item key={field.name} label={field.label}>
          <Input
            onChange={(e) => {
              handleTextValuesChange(e);
            }}
            id={field.name}
            placeholder={field.placeHolder}
            defaultValue={field.value}
            disabled={disabled}
            // value={formState[field.name]}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function LongTextInputSetting({ fields, onSave, disabled }) {
  const [form] = Form.useForm();

  const hanldeSubmit = () => onSave();

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 350 }}>
      {fields.map((field) => (
        <Form.Item key={field.name} label={field.label}>
          <Input
            placeholder={field.placeHolder}
            value={field.value}
            disabled={disabled}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" onClick={hanldeSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
