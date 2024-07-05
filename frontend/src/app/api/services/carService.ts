import axios from "axios";
import { API_URL } from "./auth";

interface FetchCarsParams {
  startDate: string;
  endDate: string;
}

export const fetchCars = async ({ startDate, endDate }: FetchCarsParams) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${API_URL}/cars`, {
      headers,
      params: { startDate, endDate },
    });

    console.log(response, "cars response");
    if (!response.data) {
      throw new Error("Failed to fetch cars");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error; // Rethrow error to handle it in the calling component
  }
};
