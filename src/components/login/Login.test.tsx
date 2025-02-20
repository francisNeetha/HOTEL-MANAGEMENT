import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import api from "../../axios/axiosInterceptor";

// Mocking useNavigate globally
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocking Axios globally
jest.mock("../../axios/axiosInterceptor", () => ({
  post: jest.fn(),
}));

describe("Login Component", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders login form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Using role instead of `getByText` to avoid multiple elements issue
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password!");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("submits login form successfully and redirects based on role", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { token: "mockToken", role: "customer", customer: { name: "John Doe" } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password!"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/customers/login", {
        email: "test@example.com",
        password: "password123",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/customer");
  });

  test("displays error message on failed login", async () => {
    (api.post as jest.Mock).mockRejectedValue({
      response: { data: { error: "Invalid credentials" } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password!"), { target: { value: "wrongpass" } });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
  });
});
