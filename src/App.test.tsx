import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup";
import App from "./App";


test("renders Signup component on /signup route", () => {
  render(
    <MemoryRouter initialEntries={["/signup"]}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/signup/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});

test("renders 'not found' or fallback UI for unmatched routes", () => {
  window.history.pushState({}, "Unknown Page", "/unknown"); 

  render(
   
      <App />
    
  );
  expect(screen.queryByText(/signup/i)).not.toBeInTheDocument();
});
