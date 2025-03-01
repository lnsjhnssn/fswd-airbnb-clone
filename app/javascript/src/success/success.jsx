import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

const Success = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const booking_id = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(
      `/api/bookings/${booking_id}`,
      safeCredentials({
        method: "GET",
      })
    )
      .then(handleErrors)
      .then((data) => {
        setBooking(data.booking);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking:", error);
        setLoading(false);
      });
  }, [booking_id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5">
          <p>Loading booking details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div>
          <div>
            <h3>Your booking is being processed</h3>
          </div>
          <div>
            {booking && (
              <div>
                <h4>{booking.property.title}</h4>
                <p>
                  Check-in: {new Date(booking.start_date).toLocaleDateString()}
                </p>
                <p>
                  Check-out: {new Date(booking.end_date).toLocaleDateString()}
                </p>
                <p>
                  Payment Status:{" "}
                  {booking.charges.some((charge) => charge.complete) ? (
                    <span>Paid</span>
                  ) : (
                    <span>Processing</span>
                  )}
                </p>
              </div>
            )}
            <div>
              <p>
                We have received your payment and are finalizing your booking
                details. You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
