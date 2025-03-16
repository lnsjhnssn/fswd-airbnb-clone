import React, { useEffect, useState } from "react";
import Layout from "@src/layout";
import MyProperties from "./myProperties";
import { checkAuth } from "../../utils/api";

import "./hosting.scss";

const Hosting = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
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
      <div>
        <MyProperties userId={userId} />
      </div>
    </Layout>
  );
};

export default Hosting;
