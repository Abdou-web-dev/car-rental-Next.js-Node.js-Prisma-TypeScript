import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import closeIcon from "../../../../../public/assets/img/close.png";
import Image from "next/image";
import { Reservation, UpdateReservationResponse } from "@/src/app/types/type";
import { changeReservation } from "@/src/app/api/services/reservationService";
import toast from "react-hot-toast";

interface UpdateReservationContentProps {
  reservation: Reservation | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateReservationContent: FunctionComponent<UpdateReservationContentProps> = ({
  reservation,
  setIsModalOpen,
  isModalOpen,
}) => {
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [updatedReservation, setUpdatedReservation] = useState<Reservation>();

  const handleSaveChanges = async () => {
    if (!reservation) {
      console.error("No reservation found.");
      return;
    }

    try {
      const updateReservationResponse: UpdateReservationResponse = await changeReservation(
        reservation.id,
        new Date(newStartDate).toISOString(),
        new Date(newEndDate).toISOString()
      );

      const updateMessage = updateReservationResponse.message;

      if (updateMessage === "reservation updated successfully") {
        setIsModalOpen(false);
        toast.success("Reservation updated successfully!");
      } else {
        toast.error("Failed to update reservation.");
      }

      setUpdatedReservation(updateReservationResponse.updatedReservation);

      console.log("Reservation updated successfully!", updateReservationResponse);
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("An error occurred while updating the reservation.");
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (reservation) {
      setNewStartDate(reservation.startDate.split("T")[0]);
      setNewEndDate(reservation.endDate.split("T")[0]);
    }
  }, [reservation]);

  return (
    <>
      <div className={`flex justify-end UpdateReservationContent-container`}>
        <button
          className="modal-btn-yes p-0"
          onClick={() => setIsModalOpen(false)}
        >
          <Image
            src={closeIcon}
            alt="Close Icon"
            width={34}
            height={34}
          />
        </button>
      </div>
      <div className={`modal-content relative p-4`}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Choose a New Start Date:
          </label>
          <input
            id="startDate"
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg transition-shadow duration-300"
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            Choose a New End Date:
          </label>
          <input
            id="endDate"
            type="date"
            min={newStartDate}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg transition-shadow duration-300"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateReservationContent;
