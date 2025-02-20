import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/RoomDetails.css"
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const RoomDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};

  if (!room) {
    return <p>No room details found.</p>;
  }

    return (
        <div>
            <Navbar />
        <div className="room-details-page">
          <div className="room-details-container">
            <img src={room.image} alt={room.title} className="room-image" />
            <div className="room-info">
              <h2>{room.title}</h2>
              <p className="room-price">${room.price}</p>
              <p><strong>Size:</strong> {room.size}</p>
              <p><strong>Guests:</strong> {room.guests}</p>
              <p><strong>Beds:</strong> {room.beds}</p>
              <p className="room-description">{room.description}</p>
              <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
          </div>
            </div>
            <Footer/>
    </div>
  );
};

export default RoomDetails;
