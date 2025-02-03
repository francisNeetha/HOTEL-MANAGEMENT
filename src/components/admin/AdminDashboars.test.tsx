import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); 
  });

  test("renders loading text when no admin data is available", () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders admin details when localStorage has admin data", () => {
    const mockAdmins = [
      { id: 1, name: "Admin One", email: "admin1@example.com", role: "admin" },
      { id: 2, name: "Admin Two", email: "admin2@example.com", role: "admin" },
    ];

    localStorage.setItem("user", JSON.stringify(mockAdmins));

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Admin One/)).toBeInTheDocument();
    expect(screen.getByText(/admin1@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Admin Two/)).toBeInTheDocument();
    expect(screen.getByText(/admin2@example.com/)).toBeInTheDocument();
  });

  test("clears localStorage and navigates to login on logout", () => {
    localStorage.setItem(
      "user",
      JSON.stringify([{ id: 1, name: "Admin One", email: "admin1@example.com", role: "admin" }])
    );
    localStorage.setItem("token", "sample_token");

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
