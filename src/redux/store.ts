import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import bookingReducer from './bookingSlice'

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    bookings: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
