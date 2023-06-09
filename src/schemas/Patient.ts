import joi, { Schema } from "joi";

export const patientSchema: joi.ObjectSchema<Schema> = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
