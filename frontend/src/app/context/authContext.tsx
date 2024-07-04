"use client";

import React, { useEffect, useState } from "react";
import { User } from "../types/type";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<User>>;
  authenticatedUser: User;
}
export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setAuthenticatedUser: () => {},
  authenticatedUser: { email: "", id: 0 },
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable to track authentication status
  // const [currentUser, setcurrentUser] = useState();
  const [authenticatedUser, setAuthenticatedUser] = useState<User>({ email: "", id: 0 });

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authenticatedUser,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
