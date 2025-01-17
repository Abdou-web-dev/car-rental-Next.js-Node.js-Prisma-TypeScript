import React, { useContext } from "react";
import { useFormik } from "formik";
import { authFormValidationSchema } from "../../validation/authFormValidationSchema";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
  formType: "signup" | "login"; // Specify the form type as a prop
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, error, formType }) => {
  const formikAuthForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      // role: "regular",
    },
    validationSchema: authFormValidationSchema(formType),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.email as string, values.password);

      console.log(error.length, "error.length");
      if (error.length > 0) {
        return; // leave the onSubmit function early if there is a server error
      } else {
        resetForm(); // if there is no backend error , then clear the form fields
      }
    },
  });

  const inputWrapperClassName = `${
    formikAuthForm.errors.email || formikAuthForm.errors.password ? "" : "mb-4"
  }  xl:flex xl:flex-row xl:justify-between xl:gap-8 xl:items-center
  sm:flex sm:flex-col sm:justify-between sm:gap-1 sm:items-center`;

  const inputClassName = `form-input pl-2 mt-1 block w-full sm:w-3/4 md:w-2/3 lg:w-2/3 h-10 border border-gray-300 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-100 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-200`;

  return (
    <form
      className="auth-form-component  bg-gray-100 p-4 xl:p-8 rounded-md shadow-md"
      onSubmit={formikAuthForm.handleSubmit}
    >
      <div className={`${inputWrapperClassName}`}>
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="email"
        >
          Email :
        </label>
        <input
          id="email"
          className={`${inputClassName}`}
          type="email"
          name="email"
          value={formikAuthForm.values.email}
          onChange={formikAuthForm.handleChange}
          onBlur={formikAuthForm.handleBlur}
          required
        />
      </div>
      <>
        {formikAuthForm.touched.email && formikAuthForm.errors.email ? (
          <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">
            {formikAuthForm.errors.email}
          </div>
        ) : null}
      </>
      <div className={`${inputWrapperClassName}`}>
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="password"
        >
          Password :
        </label>
        <input
          id="password"
          className={`${inputClassName}`}
          type="password"
          name="password"
          value={formikAuthForm.values.password}
          onChange={formikAuthForm.handleChange}
          onBlur={formikAuthForm.handleBlur}
          required
        />
      </div>

      <>
        {formikAuthForm.touched.password && formikAuthForm.errors.password ? (
          <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">
            {formikAuthForm.errors.password}
          </div>
        ) : null}
      </>
      {/* <div>
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="password"
        >
          userRole :
        </label>
        <input
          type="text"
          id="userRole"
          name="userRole"
          onChange={formikAuthForm.handleChange}
          value={formikAuthForm.values.userRole}
          placeholder="Role (e.g., user or admin)"
        />
        {formikAuthForm.touched.userRole && formikAuthForm.errors.userRole && (
          <div>{formikAuthForm.errors.userRole}</div>
        )}
      </div> */}
      <div className="flex items-center flex-col justify-center">
        {error && <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">{error}</div>}
        {/* Display the error message */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {formType === "signup" ? "Sign Up" : formType === "login" ? "Login" : ""}
        </button>
      </div>
    </form>
  );
};
