import { configureStore } from "@reduxjs/toolkit";
import customerReducer, { setUser, logout } from "./customerSlice";

interface CustomerState {
  user: { id: number; name: string; email: string; phone: string; role: string } | null;
}

describe("customerSlice initial state", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize user from localStorage when data exists", () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", role: "customer" };
    localStorage.setItem("user", JSON.stringify(mockUser));

    const initialState: CustomerState = {
      user: JSON.parse(localStorage.getItem("user") ?? "null"),
    };

    expect(initialState.user).toEqual(mockUser);
  });

  test("should initialize user as null when localStorage is empty", () => {
    localStorage.removeItem("user");

    const initialState: CustomerState = {
      user: JSON.parse(localStorage.getItem("user") ?? "null"),
    };

    expect(initialState.user).toBeNull();
  });
});

interface RootState {
  customer: {
    user: { id: number; name: string; email: string; phone: string; role: string } | null;
  };
}

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

const mockUser = { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", role: "customer" };

describe("customerSlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should handle initial state", () => {
    const state: RootState = store.getState();
    expect(state.customer.user).toBeNull();
  });

  test("should set user correctly", () => {
    store.dispatch(setUser(mockUser));
    
    const state: RootState = store.getState();
    expect(state.customer.user).toEqual(mockUser);

    const storedUser = localStorage.getItem("user");
    expect(storedUser).not.toBeNull();
    expect(JSON.parse(storedUser!)).toEqual(mockUser); 
  });

  test("should log out user correctly", () => {
    store.dispatch(setUser(mockUser));
    store.dispatch(logout());

    const state: RootState = store.getState();
    expect(state.customer.user).toBeNull();
    
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});


describe("customerSlice - initialState", () => {
    afterEach(() => {
      localStorage.clear(); 
    });
    it("should initialize state with user as null if localStorage is empty", () => {
      localStorage.removeItem("user"); 
  
      const expectedState = { user: null };
  
      expect(customerReducer(undefined, { type: "@@INIT" })).toEqual(expectedState);
    });
  });