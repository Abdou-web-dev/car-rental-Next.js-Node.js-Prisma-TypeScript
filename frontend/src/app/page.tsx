"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/authContext";
import AvailableCars from "./components/cars/AvailableCars";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
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

  useEffect(() => {
    // the authentication context initialization (useEffect for setting authenticatedUser) must happen early in your application lifecycle, ideally in a central component like page.tsx
    const accessToken = localStorage.getItem("token");
    if (accessToken && isLoggedIn) {
      // Parse the token or fetch user info from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      console.log(storedUser, "storedUser");

      setAuthenticatedUser({
        email: storedUser?.email,
        id: storedUser?.id,
      });
      console.log(authenticatedUser, "authenticatedUser");
      //   setAuthenticatedUser is used to update the authentication context with the user information retrieved from localStorage.
      //   console.log(authenticatedUser, "authenticatedUser");
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
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
