import bmw from "../../../public/assets/img/bmw-svgrepo-com.svg";
import volkswagen from "../../../public/assets/img/volkswagen-svgrepo-com.svg";
import audi from "../../../public/assets/img/audi-11-logo-svgrepo-com.svg";
import chevrolet from "../../../public/assets/img/chevrolet-svgrepo-com.svg";
import ford from "../../../public/assets/img/ford-1-logo-svgrepo-com.svg";
import honda from "../../../public/assets/img/honda-svgrepo-com.svg";
import hyundai from "../../../public/assets/img/hyundai-svgrepo-com.svg";
import mercedes from "../../../public/assets/img/mercedes-svgrepo-com.svg";
import nissan from "../../../public/assets/img/nissan-svgrepo-com.svg";
import toyota from "../../../public/assets/img/toyota-svgrepo-com.svg";
import aston from "../../../public/assets/img/aston-martin-alt-svgrepo-com.svg";
import bentley from "../../../public/assets/img/bentley-svgrepo-com.svg";
import bugatti from "../../../public/assets/img/bugatti-svgrepo-com.svg";
import chrysler from "../../../public/assets/img/chrysler-2.svg";
import ferrari from "../../../public/assets/img/ferrari-svgrepo-com.svg";
import maserati from "../../../public/assets/img/maserati-svgrepo-com.svg";
import lamborghini from "../../../public/assets/img/lamborghini-svgrepo-com.svg";
import porsche from "../../../public/assets/img/porsche-6-logo-svgrepo-com.svg";
import rolls from "../../../public/assets/img/rolls-royce-svgrepo-com.svg";
import peugeot from "../../../public/assets/img/peugeot-svgrepo-com.svg";
// import bmw from "../../../public/assets/img/ ";
// import bmw from "../../../public/assets/img/ ";

// Define the type for the logos object
const logos: Record<string, string> = {
  BMW: bmw,
  Toyota: toyota,
  Honda: honda,
  Ford: ford,
  Chevrolet: chevrolet,
  Nissan: nissan,
  Hyundai: hyundai,
  ["Mercedes-Benz"]: mercedes,
  Audi: audi,
  Volkswagen: volkswagen,
  [`Aston Martin`]: aston,
  ["Rolls-Royce"]: rolls,
  Bugatti: bugatti,
  Porsche: porsche,
  Lamborghini: lamborghini,
  Ferrari: ferrari,
  Chrysler: chrysler,
  GM: bmw,
  Bentley: bentley,
  Maserati: maserati,
  Peugeot: peugeot,

  // Add more car brands and their logos here
};

export const carBrandLogo = (make: string) => {
  return logos[make] || "/logos/default.png"; // Return a default logo if the make is not found
};
