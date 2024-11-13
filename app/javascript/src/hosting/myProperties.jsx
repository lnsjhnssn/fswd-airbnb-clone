import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors } from "../../utils/fetchHelper";

import "./../styles/main.scss";

const MyProperties = ({ userId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [propertyBookings, setPropertyBookings] = useState({});

  const fetchUserProperties = async () => {
    const response = await fetch("/api/properties");
    const data = await handleErrors(response);
    return data.properties.filter((property) => property.user_id === userId);
  };

  const fetchPropertyBookings = async (properties) => {
    const bookingsPromises = properties.map((property) =>
      fetch(`/api/properties/${property.id}/bookings`)
        .then(handleErrors)
        .then((data) => ({
          propertyId: property.id,
          bookings: data.bookings,
        }))
    );

    const bookingsResults = await Promise.all(bookingsPromises);
    const bookingsMap = {};
    bookingsResults.forEach((result) => {
      bookingsMap[result.propertyId] = result.bookings;
    });
    return bookingsMap;
  };

  useEffect(() => {
    if (userId) {
      fetchUserProperties()
        .then(async (userProperties) => {
          setProperties(userProperties);
          const bookings = await fetchPropertyBookings(userProperties);
          setPropertyBookings(bookings);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <div className="container-my-properties">
      <h2>My Properties</h2>
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <h3>{property.title}</h3>
          <div className="property-details">
            <p>
              <strong>Location:</strong> {property.city}, {property.country}
            </p>
            <p>
              <strong>Price:</strong> ${property.price_per_night}/night
            </p>
          </div>

          <div className="bookings-section">
            <h4>Reservations</h4>
            {propertyBookings[property.id]?.length === 0 ? (
              <p className="no-bookings">No bookings yet</p>
            ) : (
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyBookings[property.id]?.map((booking) => (
                    <tr
                      key={booking.id}
                      className={
                        booking.is_paid ? "paid-booking" : "unpaid-booking"
                      }
                    >
                      <td>{booking.user.username || "Guest"}</td>
                      <td>
                        {new Date(booking.start_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                      <td>
                        {new Date(booking.start_date) > new Date() ? (
                          <span className="status upcoming">Upcoming</span>
                        ) : new Date(booking.end_date) < new Date() ? (
                          <span className="status completed">Completed</span>
                        ) : (
                          <span className="status active">Active</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`payment-status ${
                            booking.is_paid ? "paid" : "pending"
                          }`}
                        >
                          {booking.is_paid ? "✓ Paid" : "⏳ Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProperties;
