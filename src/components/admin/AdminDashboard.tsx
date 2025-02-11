import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmins = localStorage.getItem("user");
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {admins.length > 0 ? (
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>
              <p>Name: {admin.name}</p>
              <p>Email: {admin.email}</p>
              <p>Role: {admin.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
