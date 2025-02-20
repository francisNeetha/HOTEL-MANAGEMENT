import React from "react";
import { render, screen  } from "@testing-library/react";
import CustomerBookings from "./CustomerBookings";

describe("CustomerBookings Component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays loading state initially", () => {
    render(<CustomerBookings />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

 
  
  

  test("displays 'No bookings found' when API returns an empty array", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<CustomerBookings />);

    expect(await screen.findByText(/No bookings found/i)).toBeInTheDocument();
  });

  test("displays error message on API failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Server error" }),
    });

    render(<CustomerBookings />);

    expect(await screen.findByText(/Failed to fetch bookings/i)).toBeInTheDocument();
  });
});
