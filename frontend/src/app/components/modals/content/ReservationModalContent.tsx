import { Dispatch, FunctionComponent, SetStateAction } from "react";
import closeIcon from "../../../../../public/assets/img/close.png";
import { formatDate } from "../../../utils/helpers";
import Image from "next/image";
import { carBrandLogo } from "../../../utils/logos";
import { Car, Reservation } from "@/src/app/types/type";
import Divider from "../../Divider";
import { useRouter } from "next/navigation";

interface ReservationModalContentProps {
  reservation: Reservation | undefined;
  car: Car;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isReservationDetailsModalOpen?: boolean;
}

const ReservationModalContent: FunctionComponent<ReservationModalContentProps> = ({
  car,
  reservation,
  setIsModalOpen,
  isReservationDetailsModalOpen,
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`flex justify-end ReservationModalContent-container ${
          isReservationDetailsModalOpen ? "text-white " : ""
        }`}
      >
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
      <div className={`modal-content relative ${isReservationDetailsModalOpen ? "p-16 bg-slate-400 text-white" : ""}`}>
        {reservation && (
          <div>
            {isReservationDetailsModalOpen ? null : (
              <h2 className="text-xl font-bold mb-4 text-slate-600">Reservation created successfully !</h2>
            )}

            {isReservationDetailsModalOpen ? (
              <h3 className="text-lg font-semibold mb-2 italic ms-12">" Reservation Details : "</h3>
            ) : (
              <h3 className="text-lg font-semibold mb-2">Reservation Details : </h3>
            )}

            {isReservationDetailsModalOpen && <Divider isBlackDivider />}

            <p className="mb-1 font-serif">ID: {reservation?.id}</p>
            {isReservationDetailsModalOpen && <Divider />}
            <p className="mb-1">Car ID: {reservation?.carId}</p>
            {isReservationDetailsModalOpen && <Divider />}
            <p className="mb-1 font-serif">Start Date: {formatDate(reservation?.startDate)}</p>
            {isReservationDetailsModalOpen && <Divider />}
            <p className="mb-1">End Date: {formatDate(reservation?.endDate)}</p>
            {isReservationDetailsModalOpen && <Divider />}
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
        <div className="mt-4">
          <button
            onClick={() => {
              router.push("/reservations");

              setIsModalOpen(false);
            }}
            className="py-2.5 px-4 top-0 left-0 right-0 bottom-0 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded transition-opacity duration-300"
          >
            <span className="text-xs">View all my reservations</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationModalContent;
