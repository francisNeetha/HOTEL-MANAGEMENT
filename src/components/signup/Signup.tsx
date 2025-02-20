import React, { useState } from "react";
import "../../styles/Signup.css";
import logo from "../../assets/signuplogo.png";
import api from "../../axios/axiosInterceptor"

interface SignupFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.phone ||
      !formValues.password
    ) {
      setError("All fields are required!");
      return;
    }
 
        console.log("Sending data:", formValues);  
            const response = await api.post("/customers/signup", formValues).catch((err) => {
              if (err.response) {
                const errorMessage = err.response?.data?.error ?? "Failed to register user!";
                setError(errorMessage);
              } else {
                setError("An unknown error occurred!");
              }
            });
          
            if (response && response.status === 201) {
              console.log("Response:", response.data);
              setSuccessMessage("User registered successfully!");
              setFormValues({ name: "", email: "", phone: "", password: "" });
              setError(null);
            }   
};
  return (
    <div className="signup-container">
      <div className="signup-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>signup</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <input type="text"
            name="name"
            placeholder="Full Name"
            value={formValues.name}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formValues.email}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formValues.phone}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
