import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer/Footer";

describe("Footer Component", () => {
  test("renders the footer logo correctly", () => {
    render(<Footer />);
    expect(screen.getByText("PAUCEK & LAGE")).toBeInTheDocument();
  });

  test("renders About Us section with correct links", () => {
    render(<Footer />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
  });

  test("renders Experiences section with correct links", () => {
    render(<Footer />);
    expect(screen.getByText("Experiences")).toBeInTheDocument();
    expect(screen.getByText("Dining")).toBeInTheDocument();
    expect(screen.getByText("Spa & Wellness")).toBeInTheDocument();
    expect(screen.getByText("Our Menu")).toBeInTheDocument();
  });

  test("renders Reach Out section with contact details", () => {
    render(<Footer />);
    expect(screen.getByText("Reach Out")).toBeInTheDocument();
    expect(screen.getByText("📍 Guidino 25, 6900, Lugano, Switzerland")).toBeInTheDocument();
    expect(screen.getByText("📧 information@cozystay.com")).toBeInTheDocument();
    expect(screen.getByText("📞 +41 22 345 67 88")).toBeInTheDocument();
  });

  test("renders footer bottom section with copyright text", () => {
    render(<Footer />);
    expect(screen.getByText("© Copyright Neetha Francis.")).toBeInTheDocument();
  });

  test("renders footer links", () => {
    render(<Footer />);
    expect(screen.getByText("PRIVACY")).toBeInTheDocument();
    expect(screen.getByText("TERMS OF USE")).toBeInTheDocument();
    expect(screen.getByText("POLICY")).toBeInTheDocument();
  });
});
