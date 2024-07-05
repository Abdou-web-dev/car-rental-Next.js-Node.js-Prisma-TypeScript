// Retrieve a list of all available cars.
//   Typically, fetching all cars means retrieving all cars available in the system, regardless of which user is logged in.

// async getAllCars() {
//   const cars = await prisma.car.findMany();
//   return cars;
// }

// async createCar(make: string, model: string, year: number) {
//   try {
//     const newCar = await prisma.car.create({
//       data: {
//         make,
//         model,
//         year,
//       },
//     });
//     return newCar;
//   } catch (error) {
//     console.error("Error in createCar:", error);
//     throw new Error("Failed to create car");
//   }
// }

// GET /api/cars
// export const getAllCars = async (req: Request, res: Response) => {
//   try {
//     const cars = await carsService.getAllCars();
//     res.status(200).json(cars);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const CreateNewCar = async (req: Request, res: Response) => {
//   // Validate request body using Joi schema
//   const { error } = validateCars(req.body);

//   try {
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
//     const { make, model, year } = req.body;

//     // Create new car using service function
//     const newCar = await carsService.createCar(make, model, year);

//     // Log success message
//     console.log("New car created:", newCar);

//     // Return success response
//     res.status(201).json(newCar);
//   } catch (error) {
//     // Log and handle any errors
//     console.error("Error creating new car:", error);
//     res.status(500).json({ error: "Failed to create new car" });
//   }
// };
