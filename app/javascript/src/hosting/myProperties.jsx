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
      <h2>My Properties</h2>
      <a href="/add-property" className="btn-add-property">
        Add a new property
      </a>
      {properties.map((property) => (
        <div key={property.id} className="property-card">
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
              <strong>Description:</strong> {property.description}
            </p>
            <div className="specs">
              <p>
                <strong>Guests:</strong> {property.max_guests} •
                <strong> Bedrooms:</strong> {property.bedrooms} •
                <strong> Beds:</strong> {property.beds} •
                <strong> Baths:</strong> {property.baths}
              </p>
            </div>
          </div>

          <div className="property-actions">
            <ul className="action-list">
              <li>
                <a href={`/property/${property.id}`} className="action-link">
                  View
                </a>
              </li>
              <li>
                <a
                  href={`/property/${property.id}/edit`}
                  className="action-link"
                >
                  Edit
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleDeleteProperty(property.id)}
                  disabled={deleteLoading}
                  className="action-link btn-delete"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
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
