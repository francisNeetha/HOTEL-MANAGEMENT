import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import CustomerDashboard from "./CustomerDashboard";

jest.mock("../../redux/bookingSlice", () => ({
  fetchBookings: jest.fn(),
}));

jest.mock("../../components/hoc/withAuth", () => (Component: any) => Component);

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CustomerDashboard Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      customer: { user: { name: "John Doe", email: "john@example.com", phone: "1234567890", role: "Customer" } },
      bookings: { bookings: [], loading: false, error: null },
    });
    store.dispatch = jest.fn();
  });

  it("renders the dashboard with customer details", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerDashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Welcome, John Doe!")).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
    expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    expect(screen.getByText(/Role:/)).toBeInTheDocument();
  });

  

  it("shows the booking form when 'Book a Room' button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerDashboard />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Bookings"));
    fireEvent.click(screen.getByText("Book a Room"));
    expect(screen.getByText("Close Booking Form")).toBeInTheDocument();
  });

  it("displays 'No bookings found' when no bookings exist", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerDashboard />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Bookings"));
    expect(screen.getByText("No bookings found.")).toBeInTheDocument();
  });

  it("handles logout", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerDashboard />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Logout"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("handles payment navigation for confirmed bookings", () => {
    store = mockStore({
      customer: { user: { name: "John Doe", email: "john@example.com", phone: "1234567890", role: "Customer" } },
      bookings: { bookings: [{ id: 1, status: "Confirmed", room_id: 101, num_of_room: 1, num_of_guest: 2, checkin_date: "2025-03-10", checkout_date: "2025-03-15" }], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerDashboard />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Bookings"));
    fireEvent.click(screen.getByText("Make Payment"));
    expect(mockNavigate).toHaveBeenCalledWith("/payment/1");
  });

  
});
