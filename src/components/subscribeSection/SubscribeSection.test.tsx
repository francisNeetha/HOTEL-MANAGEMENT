import React from "react";
import { render, screen } from "@testing-library/react";
import NewsletterSection from "../../components/subscribeSection/SubscribeSection";

describe("NewsletterSection Component", () => {
  test("renders section title and subtitle", () => {
    render(<NewsletterSection />);

    expect(screen.getByText("STAY TUNED WITH US")).toBeInTheDocument();
    expect(screen.getByText("Sign up for our newsletter")).toBeInTheDocument();
    expect(screen.getByText("to receive our news, deals and special offers.")).toBeInTheDocument();
  });

  test("renders email input and subscribe button", () => {
    render(<NewsletterSection />);

    expect(screen.getByPlaceholderText("Your Email Address")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  test("renders all images in the image grid", () => {
    render(<NewsletterSection />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(4); 
  });

  test("renders Instagram button", () => {
    render(<NewsletterSection />);

    expect(screen.getByText("Follow Us on Instagram")).toBeInTheDocument();
  });
});
