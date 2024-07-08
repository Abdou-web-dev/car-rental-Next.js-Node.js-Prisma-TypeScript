import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface ReservationFormProps {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  handleFetchCars: () => Promise<void>;
}

const ReservationForm: FunctionComponent<ReservationFormProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFetchCars,
}) => {
  return (
    <div className="reservation-form p-20 relative mb-4 flex flex-col md:flex-row gap-6 md:space-x-4 justify-center items-center book-car-section border rounded border-stone-300">
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
          className="border border-gray-300 p-2 rounded-md w-full hover:shadow-lg transition-shadow duration-300"
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
          className="border border-gray-300 p-2 rounded-md w-full hover:shadow-lg transition-shadow duration-300"
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
  );
};

export default ReservationForm;
