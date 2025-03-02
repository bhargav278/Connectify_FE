import axios from "axios";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL, // Change to your API URL
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Request Interceptor (Adds Token Automatically)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (Handles Errors Globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    // Handle Unauthorized (401) - Redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error?.response?.data || "Something went wrong");
  }
);

export const aGet = async (url, params = {}) => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
}

export const aPost = async (url, data = {}) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
}

export const aPut = async (url, data) => {

  const response = await axiosInstance.put(url, data);
  return response.data;
}

export const aDelete = async (url) => {
  const response = await axiosInstance.delete(url);
  return response.data;
}
