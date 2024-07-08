import axios from "axios";
import { API_URL } from "./auth";
import {
  allUsersReservationsResponse,
  allUsersReservationsSummaryResponse,
  ChangeReservationRequest,
  CreateReservationRequest,
  CreateReservationResponse,
  Reservation,
  UpdateReservationResponse,
} from "../../types/type";

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

export const changeReservation = async (
  reservationId: number,
  startDate: string,
  endDate: string
): Promise<UpdateReservationResponse> => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const requestBody: ChangeReservationRequest = {
    startDate,
    endDate,
  };

  try {
    const response = await axios.put<UpdateReservationResponse>(
      `${API_URL}/reservations/${reservationId}`,
      requestBody,
      { headers }
    );
    console.log(response, "response changeReservation");
    return response.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const fetchUserReservations = async (userId: number): Promise<Reservation[]> => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/reservations`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    throw error;
  }
};

export const fetchAllUsersReservations = async (): Promise<allUsersReservationsResponse[]> => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    //localhost:5000/api/reservations/duration
    const response = await axios.get(`${API_URL}/reservations/duration`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    throw error;
  }
};

export const fetchUsersReservationsSummary = async (): Promise<allUsersReservationsSummaryResponse[]> => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    // from the backend ,get a list of users with total number of bookings and total duration booked

    const response = await axios.get(`${API_URL}/users/reservations-summary`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    throw error;
  }
};
