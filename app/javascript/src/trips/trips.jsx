import React from "react";
// import MyTrips from "../hosting/myTrips";
import Layout from "@src/layout";
import ListOfTrips from "./listOfTrips";

const Trips = () => {
  return (
    <Layout>
      <div className="container">
        <ListOfTrips />
      </div>
    </Layout>
  );
};

export default Trips;
