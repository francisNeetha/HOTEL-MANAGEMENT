import bookingReducer, { fetchBookings, BookingState } from "./bookingSlice";

describe("bookingSlice", () => {
  const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
  };

  it("should return the initial state", () => {
    expect(bookingReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle fetchBookings.pending", () => {
    const nextState = bookingReducer(initialState, { type: fetchBookings.pending.type });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it("should handle fetchBookings.fulfilled", () => {
    const mockBookings = [
      { id: 1, num_of_room: 1, num_of_guest: 2, checkin_date: "2024-01-01", checkout_date: "2024-01-05", status: "confirmed", room_id: 101 },
    ];

    const nextState = bookingReducer(initialState, { type: fetchBookings.fulfilled.type, payload: mockBookings });
    expect(nextState.loading).toBe(false);
    expect(nextState.bookings).toEqual(mockBookings);
  });

  it("should handle fetchBookings.rejected", () => {
    const errorMessage = "Failed to fetch bookings";
    const nextState = bookingReducer(initialState, { type: fetchBookings.rejected.type, payload: errorMessage });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it("should not mutate the initial state", () => {
    const nextState = bookingReducer(initialState, { type: fetchBookings.pending.type });
    expect(nextState).not.toBe(initialState); 
  });
  
  it("should replace old bookings when fetchBookings.fulfilled is called again", () => {
    const previousState: BookingState = {
      bookings: [
        { id: 2, num_of_room: 2, num_of_guest: 3, checkin_date: "2024-02-10", checkout_date: "2024-02-15", status: "pending", room_id: 102 },
      ],
      loading: false,
      error: null,
    };
  
    const newBookings = [
      { id: 3, num_of_room: 1, num_of_guest: 1, checkin_date: "2024-03-05", checkout_date: "2024-03-10", status: "confirmed", room_id: 103 },
    ];
  
    const nextState = bookingReducer(previousState, { type: fetchBookings.fulfilled.type, payload: newBookings });
  
    expect(nextState.bookings).toEqual(newBookings); // Old bookings replaced
  });
  
  it("should handle multiple actions sequentially", () => {
    let state = bookingReducer(initialState, { type: fetchBookings.pending.type });
    expect(state.loading).toBe(true);
  
    const mockBookings = [
      { id: 4, num_of_room: 2, num_of_guest: 4, checkin_date: "2024-04-01", checkout_date: "2024-04-05", status: "confirmed", room_id: 104 },
    ];
  
    state = bookingReducer(state, { type: fetchBookings.fulfilled.type, payload: mockBookings });
    expect(state.loading).toBe(false);
    expect(state.bookings).toEqual(mockBookings);
  
    const errorMessage = "Network error";
    state = bookingReducer(state, { type: fetchBookings.rejected.type, payload: errorMessage });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  
  it("should keep existing bookings if fetch fails", () => {
    const previousState: BookingState = {
      bookings: [
        { id: 5, num_of_room: 3, num_of_guest: 5, checkin_date: "2024-05-01", checkout_date: "2024-05-07", status: "confirmed", room_id: 105 },
      ],
      loading: false,
      error: null,
    };
  
    const nextState = bookingReducer(previousState, { type: fetchBookings.rejected.type, payload: "Fetch failed" });
  
    expect(nextState.bookings).toEqual(previousState.bookings); 
    expect(nextState.error).toBe("Fetch failed");
  }); 
});

afterEach(() => {
    jest.restoreAllMocks(); 
  });

 

  it("should handle fetch failure (API returns non-OK response)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, 
        json: () => Promise.resolve({ message: "API Failure" }),
      })
    ) as jest.Mock;

    const dispatch = jest.fn();
    const getState = jest.fn();
    const rejectWithValue = jest.fn();

    const thunk = fetchBookings();
    await thunk(dispatch, getState, { rejectWithValue } as any);

    expect(rejectWithValue).toHaveBeenCalledTimes(1);
    expect(rejectWithValue).toHaveBeenCalledWith("Failed to fetch bookings"); // Ensure correct message
  });

  it("should return data when fetch is successful", async () => {
    const mockData = [{ id: 1, room: "Deluxe" }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true, 
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const dispatch = jest.fn();
    const getState = jest.fn();
    const rejectWithValue = jest.fn();

    const thunk = fetchBookings();
    const result = await thunk(dispatch, getState, { rejectWithValue } as any);

    expect(result).toEqual(mockData); 
  });