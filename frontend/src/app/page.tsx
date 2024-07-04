"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/authContext";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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
        <div className="flex justify-end mb-4">
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
