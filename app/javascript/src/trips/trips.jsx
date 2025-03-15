import React from "react";
// import MyTrips from "../hosting/myTrips";
import Layout from "@src/layout";
import ListOfTrips from "./listOfTrips";

const Trips = () => {
  return (
    <Layout>
      <div className="container">
        <div className="header-container">
          <h2>My Trips</h2>
          <a href="/" className="link-with-background pink">
            Book a new trip
          </a>
        </div>
        <ListOfTrips />
      </div>
    </Layout>
  );
};

export default Trips;
