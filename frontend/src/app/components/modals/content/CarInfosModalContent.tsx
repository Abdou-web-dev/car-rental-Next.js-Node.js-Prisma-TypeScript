import { Car } from "@/src/app/types/type";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import Image from "next/image";
import { carBrandLogo } from "@/src/app/utils/logos";
import closeIcon from "../../../../../public/assets/img/close.png";

interface CarInfosModalContentProps {
  car: Car | null;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleCreateReservation: () => Promise<void>;
  reservationIsDone: boolean;
}

const CarInfosModalContent: FunctionComponent<CarInfosModalContentProps> = ({
  car,
  reservationIsDone,
  setIsModalOpen,
  handleCreateReservation,
}) => {
  if (car)
    return (
      <div className="p-4 flex flex-col items-center pt-0 pe-0">
        <button
          style={{ alignSelf: "end" }}
          className="modal-btn-yes p-0 "
          onClick={() => setIsModalOpen(false)}
        >
          <Image
            src={closeIcon}
            alt="Close Icon"
            width={34}
            height={34}
          />
        </button>

        <Image
          src={carBrandLogo(car?.make)}
          alt="Close Icon"
          width={54}
          height={54}
          className="mb-4"
        />

        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-600">
            Car Details :
            <span className="text-sm text-blue-950 font-serif ms-4">
              "{car.make} {car.model} {car.year}"
            </span>
          </h2>
          <p className="mb-2 font-serif">Make: {car.make}</p>
          <p className="mb-2 font-serif">Model: {car.model}</p>
          <p className="mb-2 font-serif">Year: {car.year}</p>
          {/* Add more car details as needed */}
        </div>
        {!reservationIsDone && (
          <div>
            <button
              onClick={async () => {
                await handleCreateReservation();
                setIsModalOpen(false);
              }}
              className="py-2.5 px-4 top-0 left-0 right-0 bottom-0 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-opacity duration-300"
            >
              <span className="text-xs">Book this car now</span>
            </button>
          </div>
        )}
      </div>
    );
};

export default CarInfosModalContent;
