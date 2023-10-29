import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';




export default function Update() {
    const handler = 'moji4';
    const [user,setUser]=useState({});
    const [formData,setFormData]=useState({
        firstName: "",
        lastName : ""
    })

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
    
            const data = await response.json();
            setUser({
                firstName: data.data.firstName,
                lastName: data.data.lastName,
              });
              
              setFormData({
                firstName: data.data.firstName,
                lastName: data.data.lastName,
              });
            console.log(data);
            console.log(formData);
            
          } catch (error) {
            console.error('Error fetching user data: ', error);
          }
        };
    
        fetchData();
      }, []);

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated user data to your server for saving
      await fetch(`${process.env.REACT_APP_BACKEND_API}user/${handler}/update-info`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });
      console.log(formData);
  
      // After a successful update, fetch the updated user data
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}user/public/${handler}`, {
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
      setUser(updatedData); // Update the user state with the new data
  
    //   console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };



  return (
    <div>
    <h1>Profile Update</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>lastName:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName|| ''}
          onChange={handleChange}
        />
      </div>
     
      <button type="submit">Update Profile</button>
    </form>
  </div>
  )
}
