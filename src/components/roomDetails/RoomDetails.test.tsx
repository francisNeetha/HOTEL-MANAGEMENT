import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RoomDetails from "../../components/roomDetails/RoomDetails";

const mockRoom = {
  title: "Deluxe Room",
  image: "/images/deluxe.jpg",
  price: "199",
  size: "28 m²",
  guests: "2 Guests",
  beds: "2 Beds",
  description: "A cozy deluxe room with mountain views.",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ state: { room: mockRoom } }),
  useNavigate: () => jest.fn(),
}));

describe("RoomDetails Component", () => {
  

  test("renders the Go Back button", () => {
    render(
      <MemoryRouter>
        <RoomDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });
});
