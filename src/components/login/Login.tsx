import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login.css"

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    axios
      .post("http://localhost:3001/customers/login", { email, password })
      .then((response) => {
        console.log("Full API Response:", response.data);
  
        const { token, role, customers, customer } = response.data;
  
        if (role === "admin" && customers) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(customers)); 
          navigate("/admin");
        } else if (role === "customer" && customer) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(customer)); 
          navigate("/customer");
        } else {
          console.error("User data is missing in API response!");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setError(err.response?.data?.error || "Login failed");
      });
  };
  
  

  return (
    <div className="login-page ">
      <div className="login-container">
        <h2 className="head">Login</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Not a member? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
