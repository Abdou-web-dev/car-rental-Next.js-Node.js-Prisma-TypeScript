import { Dispatch, FunctionComponent, SetStateAction } from "react";
import Modal from "react-modal";

interface CustomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  isReservationDetailsModalOpen?: boolean;
}

const CustomModal: FunctionComponent<CustomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isReservationDetailsModalOpen,
  children,
}) => {
  return (
    <div>
      {/* Reservation Modal Infos */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Reservation Prompt Modal"
        style={{
          overlay: {
            background: "rgba(128, 128, 128, 0.5)", // Darker overlay
          },
          content: {
            width: "30%",
            margin: `${isReservationDetailsModalOpen ? "5rem auto" : "10rem auto"} `,
            padding: "20px", // Padding for modal body
            background: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
          },
        }}
        className="reserv-modal"
      >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
