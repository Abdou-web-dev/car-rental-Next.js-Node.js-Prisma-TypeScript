import { FunctionComponent, useEffect, useState } from "react";
import { Car } from "../../types/type";
import { fetchCars } from "../../api/services/carService";
import { SingleCar } from "./SingleCar";
// import { makeReservation } from "../../api/services/reservationService";

interface AvailableCarsProps {}

const AvailableCars: FunctionComponent<AvailableCarsProps> = () => {
  const [cars, setCars] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); //2024-07-16 startDate example

  const handleFetchCars: () => Promise<void> = async () => {
    // after doing a first reservation , when click the "Check Availability" button in the frontend application after changing the startDate and endDate to make another reservation, the handleFetchCars function triggers the fetchCars function, which in turn sends a request to the backend. The backend filters and returns the updated list of available cars based on the new dates, reflecting the cars that are currently available for reservation within the specified timeframe. This ensures that users see the most up-to-date list of cars that they can choose from when making a reservation.
    try {
      const cars = await fetchCars({ startDate, endDate });
      setCars(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="w-full ">
      <div className="p-20 relative mb-4 flex flex-col md:flex-row gap-6 md:space-x-4 justify-center items-center book-car-section border rounded border-stone-300">
        <div className="absolute top-2 left-2">
          <span className="font-serif">Book a car :</span>
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block mb-1 text-xs font-medium text-blue-700">Start Date :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setEndDate(""); // Reset the end date when start date changes
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium text-blue-700">End Date :</label>
          <input
            type="date"
            // input (type="date") is not strictly ISO 8601 with time and timezone (YYYY-MM-DDTHH:mm:ss.sssZ), but rather YYYY-MM-DD
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} // Set the minimum end date to the selected start date
            disabled={!startDate} // Disable end date input if no start date is selected
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <button
            onClick={handleFetchCars}
            className={`
              ${!startDate || !endDate ? "cursor-not-allowed" : "cursor-pointer"}
            bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
            disabled={!startDate && !endDate}
          >
            Check Availability
          </button>
        </div>
      </div>

      {cars?.length > 0 && <h2 className="text-2xl font-bold mb-4">Available Cars</h2>}

      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {cars?.map((car: Car) => (
          <SingleCar
            key={car?.id}
            {...{
              car,
              startDate,
              endDate,
              // handleCreateReservation,
            }}
          ></SingleCar>
        ))}
      </ul>
    </div>
  );
};

export default AvailableCars;
