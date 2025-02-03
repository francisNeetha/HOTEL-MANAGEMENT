import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Customer {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const CustomerDashboard: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null); 
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedCustomer && storedToken) {
      setCustomer(JSON.parse(storedCustomer)); 
      setToken(storedToken); 
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!customer) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="customer-dashboard">
      <h2>Welcome, {customer.name}!</h2>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Role: {customer.role}</p>
      <p>Token: {token}</p> 
      <button onClick={handleLogout}></button>
    </div>
  );
};

export default CustomerDashboard;
