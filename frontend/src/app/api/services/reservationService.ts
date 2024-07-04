import axios from "axios";
import { API_URL } from "./auth";
import { CreateReservationRequest, CreateReservationResponse } from "../../types/type";

// Service method to create a reservation
export const makeReservation = async (
  userId: number,
  startDate: string,
  endDate: string,
  carId?: number
): Promise<CreateReservationResponse> => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const requestBody: CreateReservationRequest = {
    userId,
    startDate,
    endDate,
  };

  if (carId) {
    requestBody.carId = carId;
  }

  try {
    const response = await axios.post<CreateReservationResponse>(`${API_URL}/reservations`, requestBody, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};
