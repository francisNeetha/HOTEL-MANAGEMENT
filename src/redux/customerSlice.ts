import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  user: { id: number; name: string; email: string; phone: string; role: string } | null;
}

const initialState: CustomerState = {
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CustomerState["user"]>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = customerSlice.actions;
export default customerSlice.reducer;
