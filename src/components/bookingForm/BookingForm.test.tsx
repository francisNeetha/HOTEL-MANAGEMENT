import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BookingForm from "./BookingForm";
 
global.fetch = jest.fn();
 
describe("BookingForm Component", () => {
  let mockOnBookingSuccess: jest.Mock;
 
  beforeEach(() => {
    mockOnBookingSuccess = jest.fn();
    render(<BookingForm onBookingSuccess={mockOnBookingSuccess} />);
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test("renders all form elements", () => {
    expect(screen.getByPlaceholderText("Number of Rooms")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number of Guests")).toBeInTheDocument();
    expect(screen.getByTestId("checkin-date")).toBeInTheDocument();
    expect(screen.getByTestId("checkout-date")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Room ID")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
 
 

 
 
  
 
 
  test("handles successful booking", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "Room booked successfully!" }),
    });
 
    fireEvent.change(screen.getByTestId("num-of-rooms"), { target: { value: "1" } });
    fireEvent.change(screen.getByTestId("num-of-guests"), { target: { value: "2" } });
    fireEvent.change(screen.getByTestId("checkin-date"), { target: { value: "2025-03-01" } });
    fireEvent.change(screen.getByTestId("checkout-date"), { target: { value: "2025-03-05" } });
    fireEvent.change(screen.getByTestId("room-id"), { target: { value: "B202" } });
 
    await act(async () => {
      fireEvent.click(screen.getByTestId("submit-button"));
    });
 
    expect(await screen.findByTestId("booking-message")).toHaveTextContent("Room booked successfully!");
    expect(mockOnBookingSuccess).toHaveBeenCalled();
  });
 
  test("handles booking failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Booking failed due to server error" }),
    });
 
    fireEvent.change(screen.getByTestId("num-of-rooms"), { target: { value: "3" } });
    fireEvent.change(screen.getByTestId("num-of-guests"), { target: { value: "5" } });
    fireEvent.change(screen.getByTestId("checkin-date"), { target: { value: "2025-04-01" } });
    fireEvent.change(screen.getByTestId("checkout-date"), { target: { value: "2025-04-07" } });
    fireEvent.change(screen.getByTestId("room-id"), { target: { value: "C303" } });
 
    await act(async () => {
      fireEvent.click(screen.getByTestId("submit-button"));
    });
 
    expect(await screen.findByTestId("booking-message")).toHaveTextContent("Failed to book room. Please try again.");
  });
 
 
  test("does not trigger booking if fetch throws an error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
 
    fireEvent.change(screen.getByTestId("num-of-rooms"), { target: { value: "1" } });
    fireEvent.change(screen.getByTestId("num-of-guests"), { target: { value: "2" } });
    fireEvent.change(screen.getByTestId("checkin-date"), { target: { value: "2025-03-01" } });
    fireEvent.change(screen.getByTestId("checkout-date"), { target: { value: "2025-03-05" } });
    fireEvent.change(screen.getByTestId("room-id"), { target: { value: "B202" } });
 
    await act(async () => {
      fireEvent.click(screen.getByTestId("submit-button"));
    });
 
    expect(await screen.findByTestId("booking-message")).toHaveTextContent("Failed to book room. Please try again.");
  });
});
 
 