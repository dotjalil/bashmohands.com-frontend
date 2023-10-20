import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Cards.css";
import { Card } from "antd";
import { Filter } from "./FilterSlider";
const { Meta } = Card;

export const Cards = () => {
  const supabaseUrl = "https://ksrhgwdrcefysyognaty.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzcmhnd2RyY2VmeXN5b2duYXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5OTYyNjEsImV4cCI6MjAxMjU3MjI2MX0.yVa6x2XVWyDF-Dy5J6XTKLOWVnzG9aoWHmi_jG7g0OY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  let [users, setUsers] = useState([]);
  async function getUsers() {
    const { data } = await supabase.from("Users").select("*");
    setUsers(data);
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="cards">
      {users.map((user, index) => {
        return (
          <Card
            hoverable
            cover={<img alt="example" src={user.profile_pic} />}
            key={index}
          >
            <Meta title={`${user.first_name} ${user.last_name}`} />
            <p className="jopTitle">{user.job_title}</p>
            <div className="child">
              <div className="exp">
                <p className="head">Experience</p>
                <p style={{ fontWeight: "400" }}>8 Years</p>
              </div>
              <div className="rate">
                <p className="head">Rate</p>
                <p>${user.rate}/hr</p>
              </div>
            </div>
            <div className="skills">
              <p>🔥 Free 30-min session</p>
              <p>🧑‍🏫 Teaching</p>
              <p>💼 Career Mentoring</p>
              <p>+10 more...</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
