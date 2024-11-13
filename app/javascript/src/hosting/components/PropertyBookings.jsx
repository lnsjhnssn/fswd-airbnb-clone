const PropertyBookings = ({ bookings, isLoading }) => {
  if (isLoading) {
    return <p className="loading-text">Loading bookings...</p>;
  }

  if (!bookings?.length) {
    return <p className="no-bookings">No bookings yet</p>;
  }

  return (
    <ul className="bookings-list">
      {bookings.map((booking) => (
        <li key={booking.id} className="booking-item">
          {new Date(booking.start_date).toLocaleDateString()} -
          {new Date(booking.end_date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

export default PropertyBookings;
