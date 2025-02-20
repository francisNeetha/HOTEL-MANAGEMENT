import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import "../../styles/MakePayment.css";

const MakePayment: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); // Get booking ID from URL
  const navigate = useNavigate();

  // Get booking details from Redux using the ID
  const booking = useSelector((state: RootState) =>
    state.bookings.bookings.find((b) => b.id === Number(bookingId))
  );

  if (!booking) {
    return <p className="error">Booking not found!</p>;
  }

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/dashboard"); // Navigate back to dashboard after payment
  };

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      <p><strong>Room ID:</strong> {booking.room_id}</p>
      <p><strong>Rooms:</strong> {booking.num_of_room}</p>
      <p><strong>Guests:</strong> {booking.num_of_guest}</p>
      <p><strong>Check-in:</strong> {booking.checkin_date}</p>
      <p><strong>Check-out:</strong> {booking.checkout_date}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      <button className="payment-btn" onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
};

export default MakePayment;
