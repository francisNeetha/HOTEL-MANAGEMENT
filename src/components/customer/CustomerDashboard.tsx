import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/hoc/withAuth";
import BookingForm from "../../components/bookingForm/BookingForm";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchBookings } from "../../redux/bookingSlice";
import { logout } from "../../redux/customerSlice";
import "../../styles/CustomerDashboard.css";
 
const CustomerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
 
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "bookings">("profile");
 
  const customer = useSelector((state: RootState) => state.customer.user);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const loading = useSelector((state: RootState) => state.bookings.loading);
  const error = useSelector((state: RootState) => state.bookings.error);
 
  useEffect(() => {
    if (activeTab === "bookings") {
      dispatch(fetchBookings());
    }
  }, [activeTab, dispatch]);
 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handlePayment = (bookingId: number) => {
    console.log(`Processing payment for Booking ID: ${bookingId}`);
    navigate(`/payment/${bookingId}`);
  };
  
 
  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
 
      <div className="sidebar">
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
        <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>Bookings</button>
      </div>
 
      <div className="dashboard-content">
        <h2 className="welcome-text">Welcome, {customer?.name}!</h2>
 
        {activeTab === "profile" && customer && (
          <div className="profile-section">
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Role:</strong> {customer.role}</p>
          </div>
        )}
 
        {activeTab === "bookings" && (
          <div className="bookings-section">
            <h3>Your Bookings</h3>
            <button className="book-room-btn" onClick={() => setShowBookingForm(!showBookingForm)}>
              {showBookingForm ? "Close Booking Form" : "Book a Room"}
            </button>
 
            {showBookingForm && <BookingForm onBookingSuccess={() => setShowBookingForm(false)} />}
 
            {loading && <p>Loading bookings...</p>}
            {error && <p className="error">{error}</p>}
 
            {bookings.length === 0 && !loading ? <p>No bookings found.</p> : null}
            <ul>
  {bookings.map((booking) => (
    <li key={booking.id}>
      <strong>Room ID:</strong> {booking.room_id} |
      <strong> Rooms:</strong> {booking.num_of_room} |
      <strong> Guests:</strong> {booking.num_of_guest} |
      <strong> Check-in:</strong> {booking.checkin_date} |
      <strong> Check-out:</strong> {booking.checkout_date} |
      <strong> Status:</strong> {booking.status}
      
      {booking.status === "Confirmed" && (
        <button className="payment-btn" onClick={() => handlePayment(booking.id)}>
          Make Payment
        </button>
      )}
    </li>
  ))}
</ul>

          </div>
        )}
      </div>
    </div>
  );
};
 
export default withAuth(CustomerDashboard);
 