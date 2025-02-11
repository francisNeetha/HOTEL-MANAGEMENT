import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"
import logo from "../../assets/nobglogo.png";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
          <div className="logo"><img src={ logo} alt="Logo"/></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/rooms">Rooms</Link></li>
        <li className="phone-number">Tel: +41 22 345 67 88</li>
      </ul>

      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;
