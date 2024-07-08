import { FunctionComponent, useEffect, useState } from "react";
import { Car } from "../../types/type";
import { fetchCars } from "../../api/services/carService";
import { SingleCar } from "./SingleCar";
import ReservationForm from "../forms/ReservationForm";
import ViewReservButtons from "../ViewReservButtons";

interface AvailableCarsProps {}

const AvailableCars: FunctionComponent<AvailableCarsProps> = () => {
  // const userRole = localStorage.getItem("userRole");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    console.log(isAdmin, "isAdmin");
  }, []);

  const [cars, setCars] = useState<Car[]>([]);

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
      <ReservationForm {...{ endDate, handleFetchCars, setEndDate, setStartDate, startDate }} />

      {cars?.length > 0 && <h2 className="text-2xl font-bold mb-4">Available Cars</h2>}

      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {cars?.map((car: Car) => (
          <SingleCar
            key={car?.id}
            {...{
              car,
              startDate,
              endDate,
            }}
          ></SingleCar>
        ))}
      </ul>

      {isAdmin === "true" ? (
        <div className="mb-40">
          <ViewReservButtons></ViewReservButtons>
        </div>
      ) : null}
    </div>
  );
};

export default AvailableCars;
