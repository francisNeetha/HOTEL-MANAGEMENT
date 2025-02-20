import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 

  
interface Booking {
  id: number;
  num_of_room: number;
  num_of_guest: number;
  checkin_date: string;
  checkout_date: string;
  status: string;
  room_id: number;
}
 
export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}
 
const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};
 
export const fetchBookings = createAsyncThunk<Booking[], void>(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/customer/booking", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
 
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
 
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
 
export default bookingSlice.reducer;