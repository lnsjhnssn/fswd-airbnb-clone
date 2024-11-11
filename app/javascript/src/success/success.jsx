import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors } from "../../utils/fetchHelper";

import "./success.scss";

const Success = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/14`)
      .then(handleErrors)
      .then((data) => {
        setProperty(data.property);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div>
        <h1>Booking Successful!</h1>
        <p>Your booking ID is</p>
      </div>
    </Layout>
  );
};

export default Success;
