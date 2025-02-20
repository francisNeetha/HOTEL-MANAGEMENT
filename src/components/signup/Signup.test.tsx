import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import api from "../../axios/axiosInterceptor";

jest.mock("../../axios/axiosInterceptor", () => ({
  post: jest.fn(),
}));

describe("Signup Component", () => {
  it("renders the signup form with input fields and submit button", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("displays error when submitting empty form", () => {
    render(<Signup />);

    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText("All fields are required!")).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(<Signup />);

    const nameInput = screen.getByPlaceholderText<HTMLInputElement>("Full Name");
const emailInput = screen.getByPlaceholderText<HTMLInputElement>("Email Address");
const phoneInput = screen.getByPlaceholderText<HTMLInputElement>("Phone Number");
const passwordInput = screen.getByPlaceholderText<HTMLInputElement>("Password");


    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(phoneInput.value).toBe("1234567890");
    expect(passwordInput.value).toBe("password123");
  });

  it("makes an API call when valid data is submitted", async () => {
    (api.post as jest.Mock).mockResolvedValue({ status: 201, data: { message: "User registered successfully!" } });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/customers/signup", {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        password: "password123",
      });

      expect(screen.getByText("User registered successfully!")).toBeInTheDocument();
    });
  });

  it("displays error message when API request fails", async () => {
    (api.post as jest.Mock).mockRejectedValue({
      response: { data: { error: "Email already exists!" } },
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(screen.getByText("Email already exists!")).toBeInTheDocument();
    });
  });
});
