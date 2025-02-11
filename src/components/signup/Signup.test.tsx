import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import axios, { AxiosError } from "axios";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders signup form with all fields and button", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("shows error if fields are empty on form submission", async () => {
    render(<Signup />);

    fireEvent.click(screen.getByText("Register"));

    expect(
      await screen.findByText("All fields are required!")
    ).toBeInTheDocument();
  });

  test("handles successful form submission", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: "User registered successfully!" },
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("User registered successfully!")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Full Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Email Address")).toHaveValue("");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue("");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("");
  });

  

  test("handles unknown error during form submission", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("An unknown error occurred!")).toBeInTheDocument();
    });
  });
    
  test("shows success message when registration is successful", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 201, data: {} });

    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => expect(screen.getByText(/User registered successfully!/i)).toBeInTheDocument());
    });


    test("displays unknown error message when API request fails without a response", async () => {
        mockedAxios.post.mockRejectedValueOnce(new AxiosError("Network Error"));

        render(<Signup />);

        fireEvent.change(screen.getByPlaceholderText("Full Name"), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email Address"), {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
            target: { value: "1234567890" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
        expect(screen.getByText("An unknown error occurred!")).toBeInTheDocument();
    });
    });

    test("shows error if fields are empty on form submission", async () => {
        render(<Signup />);

        fireEvent.click(screen.getByText("Register"));

        expect(
        await screen.findByText("All fields are required!")
        ).toBeInTheDocument();
    }); 
});

describe("Signup Component", () => {
  
    test("displays fallback error message for unknown error", async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));
  
        render(<Signup />);
  
        fireEvent.change(screen.getByPlaceholderText("Full Name"), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email Address"), {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
            target: { value: "1234567890" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password123" },
        });
  
        fireEvent.click(screen.getByText("Register"));
  
        await waitFor(() => {
            expect(
                screen.getByText("An unknown error occurred!")
            ).toBeInTheDocument();
        });
    });

    test("handles form submission with empty fields", async () => {
        render(<Signup />);
      
        fireEvent.click(screen.getByText("Register"));
      
        await waitFor(() => {
          expect(screen.getByText("All fields are required!")).toBeInTheDocument();
        });
    });
    
    test('renders logo correctly', () => {
        render(<Signup />);
        const logo = screen.getByAltText('Logo');
        expect(logo).toHaveAttribute('src', 'test-file-stub');
      });

});

describe("Signup Component", () => {
    test("handles API error response correctly", async () => {
        const mockErrorResponse = {
          response: {
            data: {
              error: "An unknown error occurred!!"
            }
          }
        };
      
        (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);
      
        render(<Signup />);
      
        fireEvent.change(screen.getByPlaceholderText("Full Name"), {
          target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email Address"), {
          target: { value: "johndoe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
          target: { value: "1234567890" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "password123" },
        });
      
        fireEvent.click(screen.getByText("Register"));
      
        await waitFor(() => {
          expect(screen.getByText(/An unknown error occurred!/i)).toBeInTheDocument();
        });
    }); 
    
    
      
      
  });
  

