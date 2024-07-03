import Joi from "joi";

const validateReservations = (data: any) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    carId: Joi.number().integer().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  });

  return schema.validate(data);
};

export { validateReservations };
