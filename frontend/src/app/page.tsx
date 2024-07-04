"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/authContext";
import AvailableCars from "./components/cars/AvailableCars";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, authenticatedUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      router.push("/auth/signup"); // Redirect to signup page if not logged in
    }
  }, [setIsLoggedIn, router]); // Empty dependency array to run once on component mount

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    router.push("/auth/signup"); // Redirect to signup page after logout
  };

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* {authenticatedUser && authenticatedUser.email}
        <br />
        {authenticatedUser && authenticatedUser.id} */}

        <AvailableCars></AvailableCars>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return null; // Render nothing or a loading indicator while redirecting
  }
};

export default Home;
