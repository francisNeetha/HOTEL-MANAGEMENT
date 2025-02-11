import React from "react";
import { render, screen } from "@testing-library/react";
import ServicesSection from "../../components/servicesSection/ServicesSection";

describe("ServicesSection Component", () => {
  test("renders all service cards", () => {
    render(<ServicesSection />);
    
    expect(screen.getByText("Airport Pick-up Service")).toBeInTheDocument();
    expect(screen.getByText("Housekeeper Services")).toBeInTheDocument();
    expect(screen.getByText("Wifi & Internet")).toBeInTheDocument();
    expect(screen.getByText("Laundry Services")).toBeInTheDocument();
    expect(screen.getByText("Breakfast in Bed")).toBeInTheDocument();
    expect(screen.getByText("Private Parking Space")).toBeInTheDocument();
  });

  

  test("renders all service icons", () => {
    render(<ServicesSection />);
    
    expect(screen.getByText("🚖")).toBeInTheDocument();
    expect(screen.getByText("🛏️")).toBeInTheDocument();
    expect(screen.getByText("📶")).toBeInTheDocument();
    expect(screen.getByText("🧺")).toBeInTheDocument();
    expect(screen.getByText("🍽️")).toBeInTheDocument();
    expect(screen.getByText("🚗")).toBeInTheDocument();
  });
});
