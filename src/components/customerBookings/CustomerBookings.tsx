import React, { useEffect, useState } from "react";

interface Booking {
  id: number;
  num_of_room: number;
  num_of_guest: number;
  checkin_date: string;
  checkout_date: string;
  status: string;
  room_id: number;
}

const CustomerBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/customer/booking", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerBookings;
