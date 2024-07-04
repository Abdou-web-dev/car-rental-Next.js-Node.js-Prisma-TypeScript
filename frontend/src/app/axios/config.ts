import axios from "axios";

// Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Response interceptor to handle JWT token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // JWT token expired
      console.log("token has expired !");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      alert("Your session has expired. Please log in again."); // Display alert
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
