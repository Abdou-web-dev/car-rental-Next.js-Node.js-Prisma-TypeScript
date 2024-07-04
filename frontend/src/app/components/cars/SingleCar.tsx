import { FunctionComponent, useContext, useState } from "react";
import { Car, CreateReservationResponse } from "../../types/type";
import { makeReservation } from "../../api/services/reservationService";
import { AuthContext } from "../../context/authContext";

interface SingleCarProps {
  car: Car;
  startDate: string;
  endDate: string;
}

// userId: number, carId: number, startDate: Date, endDate: Date

export const SingleCar: FunctionComponent<SingleCarProps> = ({ car, startDate, endDate }) => {
  const [hasReservation, setHasReservation] = useState(car.reservations.length > 0);
  const [reservation, setReservation] = useState<CreateReservationResponse>();
  const { authenticatedUser } = useContext(AuthContext);

  const handleCreateReservation = async () => {
    setHasReservation(true);

    try {
      const newReservation = await makeReservation(authenticatedUser?.id, startDate, endDate, car.id);
      setReservation(newReservation);
      alert("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again later.");
    }
  };

  const handleChangeReservation = () => {
    // Logic to change a reservation
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      <li className="flex items-center justify-between flex-col">
        <div>
          <span className="font-bold text-lg block">{car?.make}</span>
          <span className="text-gray-500 block">{car?.model}</span>
          <span className="block">({car?.year})</span>
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleCreateReservation}
            className={`
                ${!hasReservation ? "py-2.5 px-4" : "px-1"}
                bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 rounded`}
          >
            <span className="text-xs"> Make Reservation</span>
          </button>
          {hasReservation && (
            <button
              onClick={handleChangeReservation}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-1 rounded"
            >
              <span className="text-xs"> Change Reservation</span>
            </button>
          )}
        </div>
      </li>
      <div>
        {reservation && (
          <div>
            <h3>Reservation Details:</h3>
            <p>ID: {reservation.id}</p>
            <p>Car ID: {reservation.carId}</p>
            <p>Start Date: {reservation.startDate}</p>
            <p>End Date: {reservation.endDate}</p>
            <p>Duration: {reservation.durationDays} days</p>
          </div>
        )}
      </div>
    </div>
  );
};
