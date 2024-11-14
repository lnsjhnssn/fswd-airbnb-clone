import React, { useState, useEffect } from "react";
import { fetchMyBookings } from "../../utils/api";

import "./../styles/main.scss";

const MyTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings(data.bookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Trips</h2>
      {bookings.map((booking) => (
        <a href={`/property/${booking.property.id}`} key={booking.id}>
          <div className="booking-card">
            <img
              src={booking.property.image_url}
              alt={booking.property.title}
            />
            <div className="booking-details">
              <h3>{booking.property.title}</h3>
              <p>
                Dates: {new Date(booking.start_date).toLocaleDateString()} -{" "}
                {new Date(booking.end_date).toLocaleDateString()}
              </p>
              <p>Payment: {booking.paid ? "Paid" : "Pay now"}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MyTrips;
