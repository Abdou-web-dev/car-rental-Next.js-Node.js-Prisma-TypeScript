export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  reservations: Array<{ startDate: string; endDate: string }>;
}

export interface User {
  email: string;
  id: number;
  // role: string;
}

// Define the request body interface for reservation creation
export interface CreateReservationRequest {
  userId: number;
  carId?: number; // Optional, as the backend can find an available car if not provided
  startDate: string; //  YYYY-MM-DD format date string
  endDate: string; //  YYYY-MM-DD format date string
}

export interface ChangeReservationRequest {
  startDate: string; //  YYYY-MM-DD format date string
  endDate: string; //  YYYY-MM-DD format date string
}

export interface UpdateReservationResponse {
  message: string;
  updatedReservation: Reservation;
}

// Define the response interface for reservation creation
export interface CreateReservationResponse {
  message: string; // Message from the backend
  reservation: Reservation;
}

export interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
}

export interface allUsersReservationsResponse {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
}

export interface allUsersReservationsSummaryResponse {
  id: number;
  email: string;
  totalReservations: number;
  totalDuration: number;
}
