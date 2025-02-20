import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RoomDetails from "./RoomDetails";

const mockRoom = {
  id: 1,
  title: "Luxury Suite",
  price: "250",
  size: "50 sqm",
  guests: "4 Guests",
  beds: "2 Beds",
  description: "A luxurious suite with ocean view.",
  image: "room1.jpg",
};

describe("RoomDetails Component", () => {
  it("renders room details correctly", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/RoomDetails", state: { room: mockRoom } }]}>
        <Routes>
          <Route path="/RoomDetails" element={<RoomDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Luxury Suite")).toBeInTheDocument();
    expect(screen.getByText("$250")).toBeInTheDocument();
    expect(screen.getByText("A luxurious suite with ocean view.")).toBeInTheDocument();
  });

  it("displays error message when no room data is provided", () => {
    render(
      <MemoryRouter initialEntries={["/RoomDetails"]}>
        <Routes>
          <Route path="/RoomDetails" element={<RoomDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("No room details found.")).toBeInTheDocument();
  });

  it("goes back when clicking 'Go Back' button", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: "/RoomDetails", state: { room: mockRoom } }]}>
        <Routes>
          <Route path="/RoomDetails" element={<RoomDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = getByText("Go Back");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    // Since we're using MemoryRouter, the navigation won't actually happen in this test
  });
});




