import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import withAuth from "./withAuth";  // Adjust the path if needed

const MockComponent = () => <div>Protected Content</div>;

const ProtectedComponent = withAuth(MockComponent);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("withAuth HOC", () => {
  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test("redirects to /login if no user or token is found", async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });

  test("renders wrapped component if user and token exist", async () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "John Doe" }));
    localStorage.setItem("token", "valid_token");

    render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

    expect(await screen.findByText("Protected Content")).toBeInTheDocument();
  });
});
