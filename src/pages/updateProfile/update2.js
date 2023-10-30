import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Switch, Button, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const FormUpdate = ({ onSubmit }) => {
  const { handler } = useParams();
  // const handler = 'aliali';
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Use an async function to fetch and set the data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}user/public/${handler}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataFromServer = await response.json();

        setFormData(
          // ...formData,
          dataFromServer.data
        );
        console.log(dataFromServer);
        console.log(formData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (changedFields) => {
    // Convert the array of changed fields to a dictionary for easy access
    const changedFieldsDict = {};
    changedFields.forEach(({ name, value }) => {
      changedFieldsDict[name[0]] = value;
    });

    // Update the formData using the changedFieldsDict
    setFormData((prevData) => ({
      ...prevData,
      ...changedFieldsDict,
    }));
  };

  const handleSubmit = async (values) => {
    const photo = uploadedFile;

    console.log(photo);
    delete values.upload;

    const newValues = {
      ...values,

      // photo:photo
    };

    console.log(newValues);

    try {
      // Send the updated user data to your server for saving
      await fetch(
        `${process.env.REACT_APP_BACKEND_API}user/${handler}/update-info`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValues),
        }
      );

      // After a successful update, fetch the updated user data
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}user/public/${handler}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log(updatedData);

      message.success('Profile info updated successfully')

      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  if (formData === null) {
    return <div>Loading...</div>;
  }

  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    setUploadedFile(file);

    const fmData = new FormData();
    fmData.append("photo", file);

    const config = {
      method: "PATCH",
      body: fmData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (event) => {
        const percent = (event.loaded / event.total) * 100;
        onProgress({ percent }, file);
      },
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_API}user/${handler}/update-img`,
      config
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        onSuccess(file);
        console.log(data);
      })
      .catch((error) => {
        const errorObject = new Error("Some error");
        onError({ event: errorObject });
      });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFieldsChange={(_, allFields) => {
        handleChange(allFields);
      }}
      onFinish={handleSubmit}
      initialValues={formData}
    >
      <Form.Item label="First Name" name="firstName" 
       rules={[{ required: true, message: 'Please input your firstName!' }]}>
        <Input value={formData.firstName} />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName"
       rules={[{ required: true, message: 'Please input your lastName!' }]}>
        <Input value={formData.lastName} />
      </Form.Item>
      {/* <Form.Item label="Email" name="email">
        <Input value={formData.email} />
      </Form.Item> */}
      <Form.Item label="Country" name="country">
        <Input value={formData.country} />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input value={formData.phone} />
      </Form.Item>
      {/* <Form.Item label="Photo" name="photo" >
      <Input  value={formData.photo}/>
      </Form.Item> */}
      {/* <Form.Item label="Cover Image" name="coverImage">
        <Input value={formData.coverImage} />
      </Form.Item> */}
      <Form.Item
        label="Is Instructor"
        name="isInstructor"
        valuePropName="checked"
      >
        <Switch value={formData.isInstructor} />
      </Form.Item>
      <Form.Item label="Job Title" name="jobTitle">
        <Input value={formData.jobTitle} />
      </Form.Item>
      <Form.Item label="Bio" name="bio">
        <TextArea rows={4} value={formData.bio} />
      </Form.Item>
      <Form.Item
        label="photo"
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action={`${process.env.REACT_APP_BACKEND_API}user/${handler}/update-info`}
          listType="picture-card"
          maxCount={1}
          customRequest={uploadImage}
         
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Photo</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button block danger htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUpdate;
