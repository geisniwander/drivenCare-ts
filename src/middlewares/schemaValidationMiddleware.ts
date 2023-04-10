import { Request, Response, NextFunction } from "express";
import err from "../errors/index.js";
import Joi, {Schema} from 'joi';

type ValidateSchemaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function validateSchema(schema: Joi.ObjectSchema<Schema>): ValidateSchemaMiddleware {
  return (req: Request, res:Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw err.conflictError(errors);
    }

    next();
  };
}
