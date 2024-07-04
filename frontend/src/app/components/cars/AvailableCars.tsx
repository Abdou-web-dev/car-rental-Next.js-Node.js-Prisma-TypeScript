import { FunctionComponent, useEffect, useState } from "react";
import { API_URL } from "../../api/auth";
import { Car } from "../../types/type";
import axiosInstance from "../../axios/config";

interface AvailableCarsProps {
  // handleLogout: () => void;
}

const AvailableCars: FunctionComponent<AvailableCarsProps> = () => {
  const [cars, setCars] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axiosInstance.get(`${API_URL}/cars`, {
        headers,
        params: { startDate, endDate },
      });
      // http://localhost:5000/api/cars?startDate=2024-07-04&endDate=2024-07-10

      console.log(response, "cars response");
      if (!response.data) {
        throw new Error("Failed to fetch cars");
      }
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Available Cars</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-6 md:space-x-4 justify-center items-center">
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} // Set the minimum end date to the selected start date
            disabled={!startDate} // Disable end date input if no start date is selected
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <button
            onClick={fetchCars}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Check Availability
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {cars?.map((car: Car) => (
          <li
            key={car.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <span className="font-bold text-lg block">{car.make}</span>
            <span className="text-gray-500 block">{car.model}</span>
            <span className="block">({car.year})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableCars;
