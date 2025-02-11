import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CustomerDashboard Component", () => {
  beforeEach(() => {
    localStorage.clear(); 
    jest.clearAllMocks(); 
  });

  test("renders loading text when no customer data is available", () => {
    render(
      <BrowserRouter>
        <CustomerDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders customer details when localStorage has data", () => {
    const mockCustomer = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      role: "customer",
    };
    localStorage.setItem("user", JSON.stringify(mockCustomer));
    localStorage.setItem("token", "sample_token");

    render(
      <BrowserRouter>
        <CustomerDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome, John Doe!/)).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 1234567890/)).toBeInTheDocument();
    expect(screen.getByText(/Role: customer/)).toBeInTheDocument();
    expect(screen.getByText(/Token: sample_token/)).toBeInTheDocument();
  });

  
});
