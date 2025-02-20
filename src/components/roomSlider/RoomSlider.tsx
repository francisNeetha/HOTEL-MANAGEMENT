import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/RoomSlider.css";
import api from '../../axios/axiosInterceptor';

interface Room {
  id: number;
  room_number: number;
  room_type_id: number;
  price: string;
  capacity: number;
  title: string;
  size: string;
  guests: string;
  beds: string;
  description: string;
  image: string;
  image_url: string;
}

const RoomSlider: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms')
      .then((response) => {
        console.log("Fetched Rooms:", response.data); 
        const updatedRooms: Room[] = response.data.map((room: Room) => ({
          ...room,
          title: `Room ${room.room_number}`,
          guests: `${room.capacity} Guests`,
          beds: "2 Beds",
          image: room.image_url, 
        }));
        setRooms(updatedRooms);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);
  
  const nextSlide = () => {
    if (currentIndex + 3 < rooms.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNextDisabled = currentIndex + 3 >= rooms.length;
  const isPrevDisabled = currentIndex === 0;

  const handleDiscoverMore = (room: Room) => {
    navigate(`/RoomDetails`, { state: { room } });
  };

  return (
    <section className="room-slider-section">
      <div className="room-slider-header">
        <p className="subtitle">ENJOY WORLD-CLASS STAY EXPERIENCE</p>
        <h2>Select Your Chalet</h2>
        <p className="description">
          Escape to the beautiful mountains and valleys where dreams come true.
        </p>
      </div>

      <div className="slider-container">
        {rooms.length === 0 ? (
          <p className="loading-message">Loading rooms...</p>  
        ) : (
          <>
            <button className="prev-btn" onClick={prevSlide} disabled={isPrevDisabled}>❮</button>
            <div className="room-cards">
              {rooms.slice(currentIndex, currentIndex + 3).map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-image" style={{ backgroundImage: `url(${room.image})` }}>
                    <span className="room-price">${room.price} / NIGHT</span>
                  </div>
                  <h3>{room.title}</h3>
                  <p className="room-details">📏 {room.size} &nbsp; 👥 {room.guests} &nbsp; 🛏️ {room.beds}</p>
                  <p className="room-description">{room.description}</p>
                  <button
                    className="discover-link"
                    onClick={() => handleDiscoverMore(room)}
                  >
                    Discover More →
                  </button>
                </div>
              ))}
            </div>
            <button className="next-btn" onClick={nextSlide} disabled={isNextDisabled}>❯</button>
          </>
        )}
      </div>
    </section>
  );
};

export default RoomSlider;
