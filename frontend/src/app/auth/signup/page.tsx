"use client";

import { useContext, useEffect, useState } from "react";
import { registerUser } from "../../api/services/auth";
import { AuthForm } from "../../components/forms/AuthForm";
import { Welcome } from "../../components/Welcome";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { CustomSpin } from "../../components/spinner/CustomSpinner";
import ViewReservButtons from "../../components/ViewReservButtons";

export default function Signup() {
  const { setIsLoggedIn, isLoggedIn, setAuthenticatedUser } = useContext(AuthContext);
  const router = useRouter();
  const [signUpError, setSignUpError] = useState(""); // State to hold the error message
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true); // Set loading to true when starting signup

    try {
      const { accessToken, userEmail, userId } = await registerUser(email, password);
      if (accessToken) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", accessToken);
        // Store user info in localStorage upon successful login
        localStorage.setItem("user", JSON.stringify({ email: userEmail, id: userId }));
        setAuthenticatedUser({ email: userEmail, id: userId });
      }
      console.log(accessToken, "token");
      router.push("/"); // Navigate to the root page
    } catch (error: any) {
      console.error("Signup failed:", error.response.data.message);
      setSignUpError(error.response.data.message);
      setIsLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    // Redirect to the main page if the user is already logged in
    if (isLoggedIn) {
      router.push("/");
    } else {
      setIsLoading(false); // Only set loading to false if not logged in
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CustomSpin />
      </div>
    );
  }

  if (isLoggedIn) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="">
      <div className="signup-page-container ">
        <Welcome />
        <div className="authform flex justify-center items-center flex-col my-24">
          <div className="w-full sm:w-1/2 lg:w-[35%]">
            <AuthForm
              onSubmit={handleSignup}
              {...{ error: signUpError }}
              formType="signup"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="my-4 sedan-regular">Already have an account ?</p>

            <button
              className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="mb-40">
          <ViewReservButtons></ViewReservButtons>
        </div>
      </div>
    </div>
  );
}
