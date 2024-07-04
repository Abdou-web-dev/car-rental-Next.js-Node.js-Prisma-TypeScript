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
}

// Define the request body interface for reservation creation
export interface CreateReservationRequest {
  userId: number;
  carId?: number; // Optional, as the backend can find an available car if not provided
  startDate: string; // ISO 8601 format date string
  endDate: string; // ISO 8601 format date string
}

// Define the response interface for reservation creation
export interface CreateReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  // createdAt?: string;
  // updatedAt?: string;
}
