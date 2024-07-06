import React, { useState } from "react";
import { Car } from "../types/type";

export interface CarContextType {
  car: Car;
  setCar: React.Dispatch<React.SetStateAction<Car>>;
}
export const CarContext = React.createContext<CarContextType>({
  car: { id: 0, make: "", model: "", reservations: [], year: 0 },
  setCar: () => {},
});

export const CarContextProvider = ({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) => {
  const [car, setCar] = useState<Car>({ id: 0, make: "", model: "", reservations: [], year: 0 });

  return (
    <CarContext.Provider
      value={{
        car,
        setCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
