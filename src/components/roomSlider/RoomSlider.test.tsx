import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RoomSlider from "./RoomSlider";
import api from "../../axios/axiosInterceptor";

jest.mock("../../axios/axiosInterceptor");

const mockRooms = [
  {
    id: 1,
    room_number: 101,
    room_type_id: 1,
    price: "200",
    capacity: 2,
    title: "Room 101",
    size: "50m²",
    guests: "2 Guests",
    beds: "2 Beds",
    description: "Luxury Room with mountain view",
    image: "room1.jpg",
    image_url: "room1.jpg",
  },
  {
    id: 2,
    room_number: 102,
    room_type_id: 2,
    price: "250",
    capacity: 3,
    title: "Room 102",
    size: "60m²",
    guests: "3 Guests",
    beds: "2 Beds",
    description: "Cozy Room with modern amenities",
    image: "room2.jpg",
    image_url: "room2.jpg",
  },
  {
    id: 3,
    room_number: 103,
    room_type_id: 3,
    price: "300",
    capacity: 4,
    title: "Room 103",
    size: "70m²",
    guests: "4 Guests",
    beds: "3 Beds",
    description: "Spacious Room with sea view",
    image: "room3.jpg",
    image_url: "room3.jpg",
  },
  {
    id: 4,
    room_number: 104,
    room_type_id: 4,
    price: "350",
    capacity: 5,
    title: "Room 104",
    size: "80m²",
    guests: "5 Guests",
    beds: "3 Beds",
    description: "Family Room with balcony",
    image: "room4.jpg",
    image_url: "room4.jpg",
  },
];

describe("RoomSlider Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message before fetching rooms", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <RoomSlider />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading rooms...")).toBeInTheDocument();
  });

  test("fetches and displays rooms correctly", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockRooms });

    render(
      <BrowserRouter>
        <RoomSlider />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    expect(screen.getByText("Room 101")).toBeInTheDocument();
    expect(screen.getByText("Room 102")).toBeInTheDocument();
    expect(screen.getByText("Room 103")).toBeInTheDocument();
    expect(screen.queryByText("Room 104")).not.toBeInTheDocument();
  });

  test("next button scrolls the rooms", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockRooms });

    render(
      <BrowserRouter>
        <RoomSlider />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    const nextButton = screen.getByText("❯");
    fireEvent.click(nextButton);

    await waitFor(() => expect(screen.getByText("Room 104")).toBeInTheDocument());
  });

  test("previous button scrolls back", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockRooms });

    render(
      <BrowserRouter>
        <RoomSlider />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    const nextButton = screen.getByText("❯");
    fireEvent.click(nextButton);
    
    await waitFor(() => expect(screen.getByText("Room 104")).toBeInTheDocument());

    const prevButton = screen.getByText("❮");
    fireEvent.click(prevButton);

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());
  });

  test("navigates to RoomDetails when 'Discover More' is clicked", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockRooms });

    render(
      <BrowserRouter>
        <RoomSlider />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Room 101")).toBeInTheDocument());

    const discoverButton = screen.getAllByText("Discover More →")[0];
    fireEvent.click(discoverButton);

    expect(window.location.pathname).toBe("/RoomDetails");
  });
});
