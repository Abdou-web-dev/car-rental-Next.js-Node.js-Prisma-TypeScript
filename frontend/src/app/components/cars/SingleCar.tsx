import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Car, CreateReservationResponse } from "../../types/type";
import { makeReservation } from "../../api/services/reservationService";
import { AuthContext } from "../../context/authContext";
import closeIcon from "../../../../public/assets/img/close.png";
import Modal from "react-modal";
import "./styles.css";
import Image from "next/image";

interface SingleCarProps {
  car: Car;
  startDate: string;
  endDate: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export const SingleCar: FunctionComponent<SingleCarProps> = ({ car, startDate, endDate }) => {
  const [hasReservation, setHasReservation] = useState(car.reservations.length > 0);
  const [reservation, setReservation] = useState<CreateReservationResponse>();
  const { authenticatedUser, setIsLoggedIn, setAuthenticatedUser, isLoggedIn } = useContext(AuthContext);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  //   useEffect(() => {
  //     // console.log(authenticatedUser?.id, startDate, endDate, car?.id, "SingleCar data");
  //     console.log(authenticatedUser?.id, authenticatedUser?.email, startDate, endDate, car?.id, "SingleCar data");
  //   }, [authenticatedUser, startDate, endDate, car]);

  const handleCreateReservation = async () => {
    setHasReservation(true);
    try {
      const newReservation: CreateReservationResponse = await makeReservation(
        authenticatedUser?.id,
        startDate,
        endDate,
        car?.id
      );
      setReservation(newReservation);
      console.log(newReservation, "newReservation Response : ");
      console.log("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      console.log("Failed to create reservation. Please try again later.");
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
            onClick={() => {
              handleCreateReservation();

              setIsReservationModalOpen(true);
            }}
            className={`
                ${!hasReservation ? "py-2.5 px-4" : "px-1"}
                bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 rounded`}
          >
            <span className="text-xs"> Make Reservation</span>
          </button>
          {/* {hasReservation && (
            <button
              onClick={handleChangeReservation}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-1 rounded"
            >
              <span className="text-xs"> Change Reservation</span>
            </button>
          )} */}
        </div>
      </li>
      <div>
        {/* Reservation Modal Infos */}
        <Modal
          isOpen={isReservationModalOpen}
          onRequestClose={() => setIsReservationModalOpen(false)}
          contentLabel="Reservation Prompt Modal"
          style={{
            content: {
              width: "30%",
              height: "30%",
              margin: "10rem auto",
              background: "rgba(128, 128, 128, 0.11)",
            },
          }}
          className={"reserv-modal"}
        >
          <div className="modal-btns">
            <button
              className={`modal-btn-yes`}
              onClick={() => setIsReservationModalOpen(false)}
            >
              <Image
                src={closeIcon}
                alt="Close Icon"
                width={40}
                height={40}
              />
            </button>
          </div>
          <div>
            {reservation && (
              <div>
                <h2>Reservation created successfully !</h2>
                <h3>Reservation Details:</h3>
                <p>ID: {reservation.id}</p>
                <p>Car ID: {reservation.carId}</p>
                <p>Start Date: {formatDate(reservation.startDate)}</p>
                <p>End Date: {formatDate(reservation.endDate)}</p>
                <p>
                  Duration: {reservation.durationDays} &nbsp;
                  {reservation.durationDays === 1 ? "day" : reservation.durationDays > 1 ? "days" : ""}
                </p>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};
