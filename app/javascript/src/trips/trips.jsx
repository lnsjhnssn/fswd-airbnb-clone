import React from "react";
// import MyTrips from "../hosting/myTrips";
import Layout from "@src/layout";
import ListOfTrips from "./listOfTrips";

const Trips = () => {
  return (
    <Layout>
      <div className="container">
        <h2>My Trips</h2>
        <ListOfTrips />
      </div>
    </Layout>
  );
};

export default Trips;
