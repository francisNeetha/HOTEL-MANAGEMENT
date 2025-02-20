import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", 
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.statusText || "API Error";
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.reject(new Error(error.message || "Network error"));
    }
  );
  

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(new Error(error.response.data?.error || "API Error"));
    }
    return Promise.reject(new Error(error.message || "Network error"));
  }
);

export default api;
