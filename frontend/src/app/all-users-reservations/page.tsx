"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { allUsersReservationsResponse, Reservation } from "../types/type";
import { formatDate } from "../utils/helpers";
import { fetchAllUsersReservations } from "../api/services/reservationService";
import arrow from "../../../public/assets/img/left-arrow-svgrepo-com.svg";
import { useRouter } from "next/navigation";

export default function AllUsersReservations() {
  const [allUsersReservations, setAllUsersReservations] = useState<allUsersReservationsResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUsersReservations = async () => {
      try {
        const usersReservations = await fetchAllUsersReservations();
        setAllUsersReservations(usersReservations);
      } catch (error) {
        console.error("Error fetching user reservations:", error);
      }
    };

    getUsersReservations();
  }, []);

  return (
    <div className="myres-page-container p-4 mt-8">
      <p className="text-lg text-slate-700 font-sans mb-4">
        In a real-world car rental application, the page listing all users' reservations would typically be restricted
        to <span className="font-bold">administrators</span> or other authorized personnel who have the necessary
        <span className="font-bold"> permissions</span> to view and manage all reservations. Regular users should only
        be able to view and manage their own reservations. This restriction is important for maintaining user privacy
        and ensuring that sensitive information is only accessible to those who need it for administrative purposes.
      </p>
      <div className="flex flex-row gap-4">
        <div>
          <button onClick={() => router.push("/")}>
            <Image
              src={arrow}
              alt="arrow Icon"
              width={34}
              height={34}
            />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">All Users' Reservations</h2>
      </div>
      <div className="overflow-x-auto flex justify-center items-center">
        <table className="w-2/3 bg-white border border-gray-300 shadow-md rounded-lg mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Reservation ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsersReservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="text-center hover:bg-gray-100 group relative"
              >
                <td className="py-2 px-4 border-b text-ms font-sans text-gray-500">{reservation.id}</td>
                <td className="py-2 px-4 border-b text-xs text-blue-700 font-bold">{reservation.userId}</td>
                <td className="py-2 px-4 border-b text-ms font-sans">{formatDate(reservation.startDate)}</td>
                <td className="py-2 px-4 border-b text-xs text-blue-700">{formatDate(reservation.endDate)}</td>
                <td className="py-2 px-4 border-b text-ms font-sans">
                  {reservation.durationDays} {reservation.durationDays === 1 ? "day" : "days"}
                </td>
                <td className="py-2 px-4 border-b relative">
                  <div className="right-3 relative">
                    <button className="bg-red-500    hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition-opacity duration-300 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100">
                      <span
                        style={{ fontSize: ".6rem", letterSpacing: "0.08rem", whiteSpace: "nowrap" }}
                        className="overflow-hidden"
                      >
                        Cancel this reservation
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
