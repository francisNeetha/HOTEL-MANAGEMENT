import React, { useState } from "react";

const BookingForm: React.FC<{ onBookingSuccess: () => void }> = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    num_of_room: "",
    num_of_guest: "",
    checkin_date: "",
    checkout_date: "",
    room_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validation: Prevent empty submissions
    if (!formData.num_of_room || !formData.num_of_guest || !formData.checkin_date || !formData.checkout_date || !formData.room_id) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
      }
      

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/customers/book-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Booking failed!");

      setMessage("Room booked successfully!");
      onBookingSuccess();
    } catch (error) {
      const errorMessage = (error as Error).message || "An unknown error occurred";
      console.error("Error while booking room:", errorMessage);
      setMessage("Failed to book room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <h3>Book a Room</h3>
      {message && <p data-testid="booking-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          name="num_of_room" 
          placeholder="Number of Rooms" 
          required 
          onChange={handleChange} 
          data-testid="num-of-rooms"
        />
        <input 
          type="number" 
          name="num_of_guest" 
          placeholder="Number of Guests" 
          required 
          onChange={handleChange} 
          data-testid="num-of-guests"
        />
        <input 
          type="date" 
          name="checkin_date" 
          required 
          onChange={handleChange} 
          data-testid="checkin-date"
        />
        <input 
          type="date" 
          name="checkout_date" 
          required 
          onChange={handleChange} 
          data-testid="checkout-date"
        />
        <input 
          type="text" 
          name="room_id" 
          placeholder="Room ID" 
          required 
          onChange={handleChange} 
          data-testid="room-id"
        />
        <button 
          type="submit" 
          disabled={loading} 
          data-testid="submit-button"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
