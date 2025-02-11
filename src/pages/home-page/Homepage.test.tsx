import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "../home-page/Home-page";

describe("Homepage Component", () => {
  test("renders Navbar, HeroSection, RoomSlider, ServicesSection, NewsletterSection, and Footer", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText("Boutique Mountain Chalet")).toBeInTheDocument();

    expect(screen.getByText("Select Your Chalet")).toBeInTheDocument();

    expect(screen.getByText("Airport Pick-up Service")).toBeInTheDocument();

    expect(screen.getByText("Sign up for our newsletter")).toBeInTheDocument();

    expect(screen.getByText("PAUCEK & LAGE")).toBeInTheDocument();
  });

  test("renders experience section with activities", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    expect(screen.getByText("Unforgettable Experience")).toBeInTheDocument();

    expect(screen.getByText("Mountain Hiking")).toBeInTheDocument();
    expect(screen.getByText("Paddling Tour")).toBeInTheDocument();
    expect(screen.getByText("Camping Tour")).toBeInTheDocument();
  });
});
