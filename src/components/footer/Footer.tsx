import React from "react";
import "../../styles/Footer.css"
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">PAUCEK & LAGE</h2>
          <p>
            Founded in 1998, Paucek & Lage Resort is located on the hills of Zermatt, immersing you in the 
            wonder of the Swiss Alps against the pure sky. Welcome to CozyStay, Zermatt.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li>Our Story</li>
            <li >Contact Us</li>
            <li>Careers</li>
            
          </ul>
        </div>

        <div className="footer-section">
          <h3>Experiences</h3>
          <ul>
            <li>Dining</li>
            <li>Spa & Wellness</li>
            <li>Our Menu</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Reach Out</h3>
          <p>📍 Guidino 25, 6900, Lugano, Switzerland</p>
          <p>📧 information@cozystay.com</p>
          <p>📞 +41 22 345 67 88</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Neetha Francis.</p>
        <div className="footer-links">
          <a href="/">PRIVACY</a>
          <a href="/">TERMS OF USE</a>
          <a href="/">POLICY</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
