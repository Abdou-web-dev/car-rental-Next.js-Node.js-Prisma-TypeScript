"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { loginUser } from "../../api/services/auth";
import { AuthForm } from "../../components/forms/AuthForm";
import { Welcome } from "../../components/Welcome";
import { useRouter } from "next/navigation";
import { CustomSpin } from "../../components/spinner/CustomSpinner";

export default function Login() {
  const { setIsLoggedIn, isLoggedIn, setAuthenticatedUser, authenticatedUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(""); // State to hold the error message
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleLogin = async (email: string, password: string) => {
    try {
      const { accessToken, userEmail, userId } = await loginUser(password, email);
      console.log("token and email and user id upon login are :", accessToken, userEmail, userId);
      if (accessToken) {
        setIsLoggedIn(true);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("isLoggedIn", "true");
        // Store user info in localStorage upon successful login
        localStorage.setItem("user", JSON.stringify({ email: userEmail, id: userId }));
        setAuthenticatedUser({ email: userEmail, id: userId });
        console.log(authenticatedUser, "authenticatedUser");
      }
      router.push("/"); // Navigate to the root page
    } catch (error: any) {
      console.error("login failed:", error);
      setLoginError(error?.response?.data?.message);
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
    <div className="login-page-container ">
      {/* Responsive width */}
      <Welcome />

      <div className="authform-and-button flex justify-center items-center flex-col my-24">
        <div className="w-full sm:w-1/2 lg:w-[35%]">
          <AuthForm
            onSubmit={handleLogin}
            formType="login"
            {...{ error: loginError }}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="my-4 sedan-regular">Don't have an account ? Make a new one.</p>
          <button
            className="bg-slate-500  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
