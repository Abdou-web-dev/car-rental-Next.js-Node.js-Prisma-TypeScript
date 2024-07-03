import Joi from "joi";

const validateCars = (data: any) => {
  const carSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  });
  return carSchema.validate(data);
};

export { validateCars };
