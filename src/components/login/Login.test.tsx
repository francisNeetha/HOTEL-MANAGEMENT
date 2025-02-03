import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear(); 
    jest.clearAllMocks(); 
  });

  test("renders login form with email, password inputs, and submit button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("displays error message when login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: { error: "Invalid credentials" } } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("logs in admin user and redirects to /admin", async () => {
    const mockResponse = {
      data: {
        token: "admin_token",
        role: "admin",
        customers: [{ id: 1, name: "Admin User", email: "admin@example.com", role: "admin" }],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: "adminpass" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("admin_token");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockResponse.data.customers));
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  test("logs in customer user and redirects to /customer", async () => {
    const mockResponse = {
      data: {
        token: "customer_token",
        role: "customer",
        customer: { name: "John Doe", email: "john@example.com", phone: "1234567890", role: "customer" },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: "customerpass" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("customer_token");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockResponse.data.customer));
      expect(mockNavigate).toHaveBeenCalledWith("/customer");
    });
  });
});
