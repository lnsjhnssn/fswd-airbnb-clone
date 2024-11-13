import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors, safeCredentials } from "../../utils/fetchHelper";

import "./../styles/main.scss";

const MyBookings = ({ propertyId }) => {
  useEffect(() => {
    fetch(`/api/properties/${propertyId}/bookings`)
      .then(handleErrors)
      .then((data) => {
        console.log("Bookings:", data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [propertyId]);

  return (
    <div>
      <h2>Bookings for Property {propertyId}</h2>
      {/* Check browser console for bookings data */}
    </div>
  );
};

export default MyBookings;
