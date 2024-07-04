import { FunctionComponent } from "react";

interface ButtonProps {
  label: string;
}

const Button: FunctionComponent<ButtonProps> = ({ label }) => {
  return <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">{label}</button>;
};

export default Button;
