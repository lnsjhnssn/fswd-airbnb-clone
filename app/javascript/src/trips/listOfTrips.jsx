import React, { useState, useEffect } from "react";
import { fetchMyBookings } from "../../utils/api";

import "./../styles/main.scss";

const ListOfTrips = () => {
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
      <ul className="trips-list">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <a href={`/property/${booking.property.id}`}>
              <div className="booking-card">
                <div className="booking-details">
                  <h3>{booking.property.title}</h3>
                  <p>
                    Dates: {new Date(booking.start_date).toLocaleDateString()} -{" "}
                    {new Date(booking.end_date).toLocaleDateString()}
                  </p>
                  <p>Payment: {booking.is_paid ? "Paid" : "Pay now"}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfTrips;
