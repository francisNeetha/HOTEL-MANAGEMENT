import React from "react";
import "../../styles/SubscribeSection.css";

const images = [
  "/images/image1.png",
  "/images/image2.jpeg",
  "/images/image3.jpeg",
  "/images/image4.jpeg",
];

const NewsletterSection: React.FC = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <p className="subtitle">STAY TUNED WITH US</p>
        <h2>Sign up for our newsletter</h2>
        <p className="description">
          to receive our news, deals and special offers.
        </p>

        <div className="newsletter-form">
          <input type="email" placeholder="Your Email Address" />
          <button className="subscribe-btn">
            Subscribe 
          </button>
        </div>
      </div>

      <div className="image-grid">
        {images.map((img, index) => (
          <img key={img} src={img} alt={`Gallery ${index + 1}`} />
        ))}
      </div>

      <button className="instagram-btn">Follow Us on Instagram</button>
    </section>
  );
};

export default NewsletterSection;
