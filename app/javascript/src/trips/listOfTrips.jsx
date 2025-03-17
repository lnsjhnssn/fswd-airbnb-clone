import React, { useState, useEffect } from "react";
import { fetchMyBookings, fetchProperty } from "../../utils/api";
import Loading from "@src/components/Loading";

import "./../styles/main.scss";

const ListOfTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [propertyImages, setPropertyImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        const bookings = data.bookings;

        const updatedBookings = await Promise.all(
          bookings.map(async (booking) => {
            try {
              const propertyData = await fetchProperty(booking.property.id);
              return {
                ...booking,
                property: propertyData.property,
              };
            } catch (error) {
              console.error(
                `Error fetching property ${booking.property.id}:`,
                error
              );
              return booking;
            }
          })
        );

        setBookings(updatedBookings);

        const imagePromises = updatedBookings.map(async (booking) => {
          return {
            propertyId: booking.property.id,
            images: booking.property.images || [],
          };
        });

        const imagesResults = await Promise.all(imagePromises);

        const imagesMap = {};
        imagesResults.forEach((result) => {
          imagesMap[result.propertyId] = result.images;
        });

        setPropertyImages(imagesMap);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  if (bookings.length === 0) {
    return (
      <div className="no-bookings-message">
        <h3>You have no upcoming trips</h3>
        <p>
          <a href="/" className="link-with-background pink">
            Explore properties
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="header-container">
        <h2>My Trips</h2>
        <a href="/" className="link-with-background pink">
          Book a new trip
        </a>
      </div>
      <div className="trips-container">
        {bookings.map((booking) => (
          <div key={booking.id} className="card-container">
            <div className="booking-grid">
              <div className="booking-image">
                {propertyImages[booking.property.id]?.length > 0 ? (
                  <img
                    src={propertyImages[booking.property.id][0].url}
                    alt={booking.property.title}
                  />
                ) : (
                  <div className="no-image-placeholder">No image available</div>
                )}
              </div>

              <div className="booking-details">
                <h3>{booking.property.title}</h3>
                <p className="booking-location">
                  {booking.property.city}, {booking.property.country}
                </p>

                <div className="booking-dates">
                  <p>
                    <strong>Check in:</strong>{" "}
                    {new Date(booking.start_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check out:</strong>{" "}
                    {new Date(booking.end_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="booking-status">
                  <p>
                    <strong>Payment: </strong>
                    <span
                      className={`payment-status ${
                        booking.is_paid ? "paid" : "pending"
                      }`}
                    >
                      {booking.is_paid ? "Paid" : "Payment pending"}
                    </span>
                  </p>
                </div>

                <div className="booking-actions">
                  <a
                    href={`/property/${booking.property.id}`}
                    className="link-with-background green"
                  >
                    View full description
                  </a>
                  {!booking.is_paid && (
                    <a href="#" className="link-with-background pink">
                      Complete payment
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfTrips;
