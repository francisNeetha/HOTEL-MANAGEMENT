import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MakePayment from "./MakePayment";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe("MakePayment Component", () => {
  let store: any;
  const bookingData = {
    id: 1,
    room_id: 101,
    num_of_room: 2,
    num_of_guest: 3,
    checkin_date: "2024-02-25",
    checkout_date: "2024-02-28",
    status: "Pending",
  };

  beforeEach(() => {
    store = mockStore({
      bookings: { bookings: [bookingData] },
    });
  });

  test("renders booking details correctly when booking exists", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/make-payment/1"]}>
          <Routes>
            <Route path="/make-payment/:bookingId" element={<MakePayment />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Make Payment")).toBeInTheDocument();

    expect(screen.getByText((content, element) => {
      return element?.textContent === "Room ID: 101";
    })).toBeInTheDocument();

    expect(screen.getByText((content, element) => {
      return element?.textContent === "Rooms: 2";
    })).toBeInTheDocument();

    expect(screen.getByText((content, element) => {
      return element?.textContent === "Guests: 3";
    })).toBeInTheDocument();
  });

  test("displays error message when booking is not found", () => {
    store = mockStore({
      bookings: { bookings: [] }, 
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/make-payment/999"]}>
          <Routes>
            <Route path="/make-payment/:bookingId" element={<MakePayment />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Booking not found!")).toBeInTheDocument();
  });

  test("shows alert and navigates to dashboard on payment", () => {
    window.alert = jest.fn();
    const useNavigateMock = require("react-router-dom").useNavigate;
    const navigateMock = jest.fn();
    useNavigateMock.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/make-payment/1"]}>
          <Routes>
            <Route path="/make-payment/:bookingId" element={<MakePayment />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Confirm Payment"));

    expect(window.alert).toHaveBeenCalledWith("Payment Successful!");
    expect(navigateMock).toHaveBeenCalledWith("/dashboard");
  });
});
