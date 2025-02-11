import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import RoomSlider from "../../components/roomSlider/RoomSlider";

jest.mock("axios");

const mockRooms = [
  {
    id: 1,
    room_number: 101,
    room_type_id: 1,
    price: "299",
    capacity: 2,
    title: "Room 101",
    size: "55 m²",
    guests: "2 Guests",
    beds: "2 Beds",
    description: "A beautiful family suite.",
    image: "/images/family.jpg",
  },
  {
    id: 2,
    room_number: 102,
    room_type_id: 2,
    price: "199",
    capacity: 2,
    title: "Room 102",
    size: "28 m²",
    guests: "2 Guests",
    beds: "2 Beds",
    description: "A cozy deluxe room.",
    image: "/images/double.jpg",
  },
  {
    id: 3,
    room_number: 103,
    room_type_id: 3,
    price: "299",
    capacity: 4,
    title: "Room 103",
    size: "55 m²",
    guests: "4 Guests",
    beds: "2 Beds",
    description: "A spacious double suite.",
    image: "/images/delux.jpg",
  },
];

describe("RoomSlider Component", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockRooms });
  });

  test("renders loading message initially", async () => {
    render(
      <MemoryRouter>
        <RoomSlider />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading rooms...")).toBeInTheDocument();
  });

  

  test("clicking next button updates the displayed rooms", async () => {
    render(
      <MemoryRouter>
        <RoomSlider />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    const nextButton = screen.getByText("❯");
    fireEvent.click(nextButton);

    await waitFor(() => expect(screen.getByText("Room 102")).toBeInTheDocument());
  });

  test("clicking previous button updates the displayed rooms", async () => {
    render(
      <MemoryRouter>
        <RoomSlider />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    const prevButton = screen.getByText("❮");
    fireEvent.click(prevButton);

    await waitFor(() => expect(screen.getByText("Room 103")).toBeInTheDocument());
  });

  
});
