import { Dispatch, FunctionComponent, SetStateAction } from "react";
import closeIcon from "../../../../../public/assets/img/close.png";
import { formatDate } from "../../../utils/helpers";
import Image from "next/image";
import { carBrandLogo } from "../../../utils/logos";
import { Car, Reservation } from "@/src/app/types/type";
interface ReservationModalContentProps {
  reservation: Reservation | undefined;
  car: Car;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ReservationModalContent: FunctionComponent<ReservationModalContentProps> = ({
  car,
  reservation,
  setIsModalOpen,
}) => {
  return (
    <>
      <div className="flex justify-end">
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
      <div className="modal-content relative">
        {reservation && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-slate-600">Reservation created successfully !</h2>
            <h3 className="text-lg font-semibold mb-2">Reservation Details:</h3>
            <p className="mb-1 font-serif">ID: {reservation?.id}</p>
            <p className="mb-1">Car ID: {reservation?.carId}</p>
            <p className="mb-1 font-serif">Start Date: {formatDate(reservation?.startDate)}</p>
            <p className="mb-1">End Date: {formatDate(reservation?.endDate)}</p>
            <p className="font-serif">
              Duration: {reservation?.durationDays}{" "}
              {reservation?.durationDays === 1 ? "day" : reservation?.durationDays > 1 ? "days" : ""}
            </p>
          </div>
        )}
        <div>
          <Image
            src={carBrandLogo(car?.make)}
            alt="Close Icon"
            width={24}
            height={24}
            className="absolute bottom-1 right-2"
          />
        </div>
      </div>
    </>
  );
};

export default ReservationModalContent;
