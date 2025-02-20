import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "../../components/home/Home";

describe("HeroSection Component", () => {
  test("renders hero text and description", () => {
    render(<HeroSection />);
    
    expect(screen.getByText("Boutique Mountain Chalet")).toBeInTheDocument();
    expect(screen.getByText("The forest paradise of warmth, tranquility and restoration")).toBeInTheDocument();
  });

  test("renders the 'Enquire Now' button", () => {
    render(<HeroSection />);
    
    const button = screen.getByText("Enquire Now");
    expect(button).toBeInTheDocument();
  });

  
});
