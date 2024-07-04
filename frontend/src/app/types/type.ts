export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  reservations: Array<{ startDate: string; endDate: string }>;
}
