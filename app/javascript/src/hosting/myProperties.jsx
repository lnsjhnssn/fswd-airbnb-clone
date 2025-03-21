import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import {
  fetchUserProperties,
  fetchAllPropertyBookings,
  deleteProperty,
} from "../../utils/api";

import "./../styles/main.scss";

const MyProperties = ({ userId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertyBookings, setPropertyBookings] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const userProperties = await fetchUserProperties();
        const filteredProperties = userProperties.filter(
          (property) => property.user_id === userId
        );
        setProperties(filteredProperties);

        const bookings = await fetchAllPropertyBookings(filteredProperties);
        setPropertyBookings(bookings);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadProperties();
    }
  }, [userId]);

  const handleDeleteProperty = async (propertyId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this property? This will also delete all associated bookings."
      )
    ) {
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteProperty(propertyId);
      setProperties(
        properties.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      alert(
        "Failed to delete property: " + (error.message || "Please try again.")
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <div className="container-my-properties">
      <div className="header-container">
        <h2>My Properties</h2>
        <a href="/add-property" className="link-with-background pink">
          Add a new property
        </a>
      </div>
      {properties.map((property) => (
        <div key={property.id} className="card-container">
          <h3>{property.title}</h3>

          {/* Property Images Grid */}
          <div className="existing-images">
            {property.images?.map((image, index) => (
              <div key={index} className="image-preview">
                <img
                  src={image.url}
                  alt={`${property.title} - Image ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="property-details">
            <p>
              <strong>Location:</strong> {property.city}, {property.country}
            </p>
            <p>
              <strong>Price:</strong> ${property.price_per_night}/night
            </p>
            <p>
              <strong>Type:</strong> {property.property_type}
            </p>

            <p>
              <strong>Guests:</strong> {property.max_guests}{" "}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Beds:</strong> {property.beds}
            </p>
            <p>
              <strong> Baths:</strong> {property.baths}
            </p>
            <p>
              <strong>Description:</strong> {property.description}
            </p>
          </div>

          <div className="property-actions">
            <ul className="action-list">
              <li>
                <a
                  href={`/property/${property.id}`}
                  className="link-with-background green"
                >
                  View
                </a>
              </li>
              <li>
                <a
                  href={`/property/${property.id}/edit`}
                  className="link-with-background green"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleDeleteProperty(property.id)}
                  disabled={deleteLoading}
                  className="link-with-background delete"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </a>
              </li>
            </ul>
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
                      <td className="td-guest">
                        <span className="mobile-label">Guest: </span>
                        {booking.user.username || "Guest"}
                      </td>
                      <td className="td-check-in">
                        <span className="mobile-label">Check In: </span>
                        {new Date(booking.start_date).toLocaleDateString()}
                      </td>
                      <td className="td-check-out">
                        <span className="mobile-label">Check Out: </span>
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td className="td-status">
                        <span className="mobile-label">Status: </span>
                        {new Date(booking.start_date) > new Date() ? (
                          <span className="status upcoming">Upcoming</span>
                        ) : new Date(booking.end_date) < new Date() ? (
                          <span className="status completed">Completed</span>
                        ) : (
                          <span className="status active">Active</span>
                        )}
                      </td>
                      <td>
                        <span className="mobile-label">Payment: </span>
                        <span
                          className={`payment-status ${
                            booking.is_paid ? "paid" : "pending"
                          }`}
                        >
                          {booking.is_paid ? "✓ Paid" : "Pending"}
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
