import axios from "axios";
import { API_URL } from "./auth";
import { Car } from "../../types/type";

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

export const fetchCarById = async (carId: number): Promise<Car> => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get<Car>(`${API_URL}/cars/${carId}`, {
      headers,
    });

    if (!response.data) {
      throw new Error("Failed to fetch car details");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching car details:", error);
    throw error; // Rethrow error to handle it in the calling component
  }
};
