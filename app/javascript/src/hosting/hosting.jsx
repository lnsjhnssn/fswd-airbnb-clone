import React, { useEffect, useState } from "react";
import { handleErrors } from "../../utils/fetchHelper";
import Layout from "@src/layout";
import MyProperties from "./myProperties";
import MyBookings from "./myBookings";

import "./hosting.scss";

const Hosting = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        setUsername(data.username);
        setUserId(data.user_id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-hosting">
        {/* <h1>Welcome, {username}!</h1> */}
      </div>

      <div>
        <MyProperties userId={userId} />
      </div>

      <h2>Add a property</h2>
      <h2>Reservations</h2>
      <div>
        <MyBookings />
        <p>No reservations yet</p>
      </div>
    </Layout>
  );
};

export default Hosting;
