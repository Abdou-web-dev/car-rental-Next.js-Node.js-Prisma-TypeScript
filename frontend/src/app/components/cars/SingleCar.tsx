import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Car, CreateReservationResponse, Reservation } from "../../types/type";
import { changeReservation, makeReservation } from "../../api/services/reservationService";
import { AuthContext } from "../../context/authContext";
import Image from "next/image";
import { formatElapsedTime } from "../../utils/helpers";
import { carBrandLogo } from "../../utils/logos";
import CustomModal from "../modals/CustomModal";
import ReservationModalContent from "../modals/content/ReservationModalContent";
// import CarInfosModalContent from "../modals/content/CarInfosModalContent";
import { fetchCarById } from "../../api/services/carService";
import CarInfosModalContent from "../modals/content/CarInfosModalContent";
import "./styles.css";

interface SingleCarProps {
  car: Car;
  startDate: string;
  endDate: string;
}

export const SingleCar: FunctionComponent<SingleCarProps> = ({ car, startDate, endDate }) => {
  const [reservation, setReservation] = useState<Reservation>();
  const [updatedReservation, setUpdatedReservation] = useState<Reservation>();

  const { authenticatedUser } = useContext(AuthContext);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isCarInfosModalOpen, setIsCarInfosModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [message, setMessage] = useState("");
  const [bookingTime, setBookingTime] = useState<null | Date | undefined>(null);
  const [isReservationDetailsModalOpen, setIsReservationDetailsModalOpen] = useState(false);
  let reservationIsDone = message === "Reservation created successfully";

  const handleCreateReservation = async () => {
    try {
      const newReservationResponse: CreateReservationResponse = await makeReservation(
        authenticatedUser?.id,
        startDate,
        endDate,
        car?.id
      );
      // Extract message and reservation data from the response
      const { message, reservation } = newReservationResponse;

      // Update state with the received message and reservation
      setMessage(message);
      setReservation(reservation);
      console.log(newReservationResponse, "newReservationResponse Response : ");
      console.log("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      console.log("Failed to create reservation. Please try again later.");
    }
  };

  const handleChangeReservation = async () => {
    if (!reservation) {
      console.error("No reservation found.");
      return;
    }
    // Format dates as ISO-8601
    //  Dates should be formatted as YYYY-MM-DDTHH:mm:ss.sssZ where Z indicates UTC time zone. Ensure that your dates are converted to this format using JavaScript's toISOString() method.
    const startDate = new Date("2020/04/15").toISOString();
    const endDate = new Date("2021/04/22").toISOString();
    try {
      const updateReservationResponse: Reservation = await changeReservation(reservation.id, startDate, endDate);

      setUpdatedReservation(updateReservationResponse);
      console.log("Reservation updated successfully!", updateReservationResponse);
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Failed to update reservation. Please try again later.");
    }
  };

  useEffect(() => {
    if (message === "Reservation created successfully") {
      setBookingTime(new Date());
    }
  }, [message]);

  const [elapsedTime, setElapsedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (((now - bookingTime.getTime()) as number) > 5 * 60 * 1000) {
        // 5 in '5 * 60 * 1000' means that the counting of the elapsed time will start 5 minutes after the reservation has been made
        setElapsedTime(formatElapsedTime(bookingTime) as string);
      } else {
        setElapsedTime(null);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [bookingTime]);

  const showCarDetails = async (): Promise<void> => {
    try {
      const carResponse = await fetchCarById(car?.id);
      console.log(carResponse, "carResponse");
      setSelectedCar(carResponse);
      setIsCarInfosModalOpen(true);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const showReservationDetails = () => {
    if (reservationIsDone) setIsReservationDetailsModalOpen(true);
    else return;
  };

  return (
    <div className="group relative">
      <div
        className={`single-car border border-gray-300 rounded-lg p-4 shadow-md group relative
        ${reservationIsDone ? "bg-green-100 border-green-500" : ""}
        `}
      >
        <Image
          src={carBrandLogo(car?.make)}
          alt=""
          width={24}
          height={24}
          className="absolute top-1 left-2 right-0"
        />
        <li className="flex items-center justify-between flex-col ">
          <div>
            <span className="font-bold text-lg block">{car?.make}</span>
            <span className="text-gray-500 block">{car?.model}</span>
            <span className="block">({car?.year})</span>
          </div>
          <div className="flex space-x-2 mt-2 ">
            <>
              {!reservationIsDone ? (
                <button
                  onClick={() => {
                    handleCreateReservation();
                    setIsReservationModalOpen(true);
                  }}
                  className="py-2.5 px-4 absolute top-0 left-0 right-0 bottom-0 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden group-hover:block"
                >
                  <span className="text-xs"> Make Reservation</span>
                </button>
              ) : (
                <p className="text-gray-600 text-xs">
                  {elapsedTime !== null ? `You booked this car ${elapsedTime} ago.` : "You just booked this car."}
                </p>
              )}
            </>
            {reservationIsDone && !isReservationModalOpen && (
              <button
                onClick={handleChangeReservation}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-1 rounded"
              >
                <span
                  className=""
                  style={{ fontSize: ".6rem", letterSpacing: ".1rem" }}
                >
                  Change Reservation
                </span>
              </button>
            )}
          </div>
        </li>
        <CustomModal
          {...{ isModalOpen: isReservationModalOpen, setIsModalOpen: setIsReservationModalOpen }}
          children={<ReservationModalContent {...{ reservation, car, setIsModalOpen: setIsReservationModalOpen }} />}
        ></CustomModal>
      </div>

      <div className="mt-0.5 mb-4">
        <div className="mt-0.5 mb-4 flex flex-col gap-7">
          {reservationIsDone && (
            <div>
              <button
                onClick={showReservationDetails}
                className="bg-red-400 hover:bg-red-500 text-white px-1 font-bold rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute hidden group-hover:block"
              >
                <span
                  className=""
                  style={{ fontSize: ".6rem", letterSpacing: ".1rem" }}
                >
                  View Reservation details
                </span>
              </button>
            </div>
          )}
          <div>
            <button
              onClick={showCarDetails}
              className="bg-slate-400 hover:bg-slate-500 text-white px-1 font-bold rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute hidden group-hover:block"
            >
              <span
                className=""
                style={{ fontSize: ".6rem", letterSpacing: ".1rem" }}
              >
                View car details
              </span>
            </button>
          </div>
        </div>
      </div>
      <CustomModal
        {...{ isModalOpen: isCarInfosModalOpen, setIsModalOpen: setIsCarInfosModalOpen }}
        children={
          <CarInfosModalContent
            reservationIsDone={reservationIsDone}
            {...{ car: selectedCar, setIsModalOpen: setIsCarInfosModalOpen, handleCreateReservation }}
          />
        }
      ></CustomModal>
      {/* ::::: */}
      <CustomModal
        {...{ isReservationDetailsModalOpen }}
        {...{ isModalOpen: isReservationDetailsModalOpen, setIsModalOpen: setIsReservationDetailsModalOpen }}
        children={
          <ReservationModalContent
            {...{ isReservationDetailsModalOpen, reservation, car, setIsModalOpen: setIsReservationDetailsModalOpen }}
          />
        }
      ></CustomModal>
    </div>
  );
};
// I achieved a nice effect where the entire SingleCar component behaves like a clickable button with the "Make reservation" text centered. This can happen when applying Tailwind CSS classes effectively to create a cohesive design and interaction.
//   useEffect(() => {
// console.log(bookingTime, elapsedTime);
// Fri Jul 05 2024 21:18:46 GMT+0100 (GMT+01:00) '1 minutes'
// bookingTime Fri Jul 05 2024 21:18:46 GMT+0100 (GMT+01:00)
// elapsedTime '1 minutes'
//   }, [bookingTime, elapsedTime]);

//   let ReservationModalContentJSX = <ReservationModalContent/>
