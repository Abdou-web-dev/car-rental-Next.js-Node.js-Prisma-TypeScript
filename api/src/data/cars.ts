// export let cars = [
//   { id: 1, make: "Toyota", model: "Corolla", year: 2022, reservations: [] },
//   { id: 2, make: "Honda", model: "Civic", year: 2021, reservations: [] },
//   { id: 3, make: "Ford", model: "F-150", year: 2020, reservations: [] },
// ];

let cars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2022, reservations: [] },
  { id: 2, make: "Honda", model: "Civic", year: 2021, reservations: [] },
  { id: 3, make: "Ford", model: "F-150", year: 2020, reservations: [] },
  { id: 4, make: "Chevrolet", model: "Malibu", year: 2019, reservations: [] },
  { id: 5, make: "Nissan", model: "Altima", year: 2020, reservations: [] },
  { id: 6, make: "Hyundai", model: "Elantra", year: 2021, reservations: [] },
  { id: 7, make: "Volkswagen", model: "Jetta", year: 2022, reservations: [] },
  { id: 8, make: "BMW", model: "X5", year: 2020, reservations: [] },
  { id: 9, make: "Mercedes-Benz", model: "E-Class", year: 2021, reservations: [] },
  { id: 10, make: "Audi", model: "A4", year: 2019, reservations: [] },
];

// Function to generate a random number within a range
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomCarModel = (usedModels: string[]) => {
  const carModels = [
    "Corolla",
    "Civic",
    "F-150",
    "Malibu",
    "Altima",
    "Elantra",
    "Jetta",
    "X5",
    "E-Class",
    "A4",
    "Camry",
    "Accord",
    "Mustang",
    "Cruze",
    "Maxima",
    "Sonata",
    "Passat",
    "3 Series",
    "C-Class",
    "Q5",
    "Rogue",
    "Forester",
    "CX-5",
    "Sorento",
    "Wrangler",
    "300",
    "Enclave",
    "Escalade",
    "Sierra",
    "XC90",
    "911",
    "Range Rover",
    "F-Type",
    "Model S",
    "488 GTB",
    "Huracán",
    "Quattroporte",
    "Stelvio",
    "Phantom",
    "Continental",
    "Chiron",
    "570S",
    "Evora",
    "DB11",
  ];
  const availableModels = carModels.filter((model) => !usedModels.includes(model));
  if (availableModels.length === 0) {
    // If all models are used, reset usedModels (this is just an example)
    usedModels = [];
  }
  const randomIndex = getRandomInt(0, availableModels.length - 1);
  const selectedModel = availableModels[randomIndex];
  usedModels.push(selectedModel); // Mark this model as used
  return selectedModel;
};

// Function to generate a random car make from a list of popular brands
const getRandomCarMake = () => {
  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Lexus",
    "Subaru",
    "Mazda",
    "Kia",
    "Jeep",
    "Chrysler",
    "Buick",
    "Cadillac",
    "GMC",
    "Volvo",
    "Porsche",
    "Land Rover",
    "Jaguar",
    "Tesla",
    "Ferrari",
    "Lamborghini",
    "Maserati",
    "Alfa Romeo",
    "Rolls-Royce",
    "Bentley",
    "Bugatti",
    "McLaren",
    "Lotus",
    "Aston Martin",
    "Lincoln",
    "Infiniti",
    "Acura",
    "Mini",
    "Genesis",
  ];
  const randomIndex = getRandomInt(0, carMakes.length - 1);
  return carMakes[randomIndex];
};

// Function to generate a random year between 2005 and 2023
const getRandomCarYear = () => {
  return getRandomInt(2005, 2023);
};

let usedModels: string[] = [];

// Generate additional random cars
for (let i = 11; i <= 40; i++) {
  const newCar = {
    id: i,
    make: getRandomCarMake(),
    model: getRandomCarModel(usedModels),
    year: getRandomCarYear(),
    reservations: [],
  };
  cars.push(newCar);
}

export { cars };

// Sample reservations (for testing)
// cars[0].reservations.push({
//   startDate: new Date("2024-07-10"),
//   endDate: new Date("2024-07-15"),
// });
// cars[1].reservations.push({
//   startDate: new Date("2024-07-05"),
//   endDate: new Date("2024-07-08"),
// });
