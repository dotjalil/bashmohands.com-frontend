import React, { useState,useEffect } from 'react';
import { Form, Input, Checkbox, Switch, Button, message ,Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// const initialValues = {
//     // Initial values for the form fields
//     firstName: '',
//     lastName: '',
//     email: '',
//     country: '',
//     phone: '',
//     photo: '',
//     coverImage: '',
//     isInstructor: false,
//     jobTitle: '',
//     bio: '',
//     upload: [],
//   };

const FormUpdate = ({  onSubmit }) => {

    const handler = 'moji4';
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        photo: '',
        coverImage: '',
        isInstructor: false,
        jobTitle: '',
        bio: '',
        upload: [],
      });

    useEffect(() => {
        // Use an async function to fetch and set the data
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}user/public/${handler}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const dataFromServer = await response.json();
              
              setFormData({
                // ...formData,
                firstName: dataFromServer.data.firstName,
                lastName: dataFromServer.data.lastName,
                email: dataFromServer.data.email,
                country:dataFromServer.data.country,
                phone: dataFromServer.data.phone,
                upload: {
                    fileList: [],
                  },
                
              });
            console.log(dataFromServer);
            console.log(formData);
            
          } catch (error) {
            console.error('Error fetching user data: ', error);
          }
        };
    
        fetchData();
      }, []);

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
        const newValues ={
            ...values,
            photo:values.upload[0]
        }
        console.log(newValues);
        
        try {
          // Send the updated user data to your server for saving
        //   await fetch(`${process.env.REACT_APP_BACKEND_API}user/${handler}/update-info`, {
        //     method: "PATCH",
        //     headers: {
        //       "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(values),
            
        //   });
        
      
          // After a successful update, fetch the updated user data
          const response = await fetch(`${process.env.REACT_APP_BACKEND_API}user/profile/${handler}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const updatedData = await response.json();
          console.log(updatedData);
        
          
      
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



  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFieldsChange={(_, allFields) => {
        handleChange(allFields);
      }}
      onFinish={handleSubmit}
    
    
    >
      <Form.Item label="First Name" name="firstName"  initialValue={formData.firstName}>
      <Input  value={formData.firstName}/>
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" initialValue={formData.lastName}>
      <Input  value={formData.lastName} />
      </Form.Item>
      <Form.Item label="Email" name="email" initialValue={formData.email}>
      <Input  value={formData.email} />
      </Form.Item>
      <Form.Item label="Country" name="country" initialValue={formData.country}>
      <Input  value={formData.country} />
      </Form.Item>
      <Form.Item label="Phone" name="phone" initialValue={formData.phone}>
      <Input  value={formData.phone} />
      </Form.Item>
      <Form.Item label="Photo" name="photo" initialValue={formData.photo}>
      <Input  value={formData.photo}/>
      </Form.Item>
      <Form.Item label="Cover Image" name="coverImage" initialValue={formData.coverImage}>
      <Input  value={formData.coverImage} />
      </Form.Item>
      <Form.Item label="Is Instructor" name="isInstructor" valuePropName="checked" initialValue={formData.isInstructor}>
        <Switch  value={formData.isInstructor}/>
      </Form.Item>
      <Form.Item label="Job Title" name="jobTitle" initialValue={formData.jobTitle}>
      <Input  value={formData.jobTitle} />
      </Form.Item>
      <Form.Item label="Bio" name="bio" initialValue={formData.bio}>
        <TextArea rows={4}  value={formData.bio}/>
      </Form.Item>
      <Form.Item label="Upload" name="upload" valuePropName="fileList" initialValue={[formData.upload]} getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card" beforeUpload={()=>false}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit" >
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUpdate;