import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";

interface ViewReservButtonsProps {}

const ViewReservButtons: FunctionComponent<ViewReservButtonsProps> = () => {
  const router = useRouter();
  // const userRole = localStorage.getItem("userRole");
  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin)
    return (
      <>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              router.push("/all-users-reservations");
            }}
            className="py-2.5 px-4 top-0 left-0 right-0 bottom-0 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded transition-opacity duration-300"
          >
            <span className="text-xs">View reservations of all users</span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              router.push("/all-users-reservations-summary");
            }}
            className="py-2.5 px-4 top-0 left-0 right-0 bottom-0 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded transition-opacity duration-300"
          >
            <span className="text-xs">View reservations' summary of all users</span>
          </button>
        </div>
      </>
    );
};

export default ViewReservButtons;
