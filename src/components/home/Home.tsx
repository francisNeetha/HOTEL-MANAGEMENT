import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
 
const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img1.jpg"
];
 
const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
 
    return () => clearInterval(interval);
  }, []);
 
    return (
        <div className="hero-section">
      <div className="slider">
      {images.map((img) => (
  <div key={img} className={`slide ${images[currentSlide] === img ? "active" : ""}`}
       style={{ backgroundImage: `url(${img})` }}>
  </div>
))}
 
      </div>
 
      <div className="hero-content">
        <h1 className="hero-text">Boutique Mountain Chalet</h1>
        <p className="hero-para">The forest paradise of warmth, tranquility and restoration</p>
        <button className="enquire-btn">Enquire Now</button>
      </div>
    </div>
  );
};
 
export default HeroSection;