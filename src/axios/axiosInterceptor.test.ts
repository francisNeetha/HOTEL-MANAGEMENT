import api from "./axiosInterceptor"; 
import MockAdapter from "axios-mock-adapter";

describe("API Interceptors", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api); 
  });

  afterEach(() => {
    mock.reset(); 
  });

  test("should return successful response", async () => {
    mock.onGet("/success").reply(200, { message: "Success" });

    const response = await api.get("/success");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: "Success" });
  });

  test("should handle API error with error message", async () => {
    mock.onGet("/error").reply(400, { error: "Bad Request" });

    await expect(api.get("/error")).rejects.toThrow("Bad Request");
  });

  test("should handle API error with default message when no response data", async () => {
    mock.onGet("/error-default").reply(500);

    await expect(api.get("/error-default")).rejects.toThrow("API Error");
  });

  test("should handle error when response is undefined", async () => {
    const error = new Error("Something went wrong"); 
    jest.spyOn(api, "get").mockRejectedValueOnce(error); 
  
    await expect(api.get("/no-response")).rejects.toThrow("Something went wrong");
  });
  
  
});
