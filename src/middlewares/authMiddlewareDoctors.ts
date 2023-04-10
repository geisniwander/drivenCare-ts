import { Request, Response, NextFunction } from "express";
import errors from "../errors/index.js";
import doctorsRepository from "../repositories/doctorsRepository.js";
import jwt from "jsonwebtoken";

interface DecodedToken {
  doctor_id: number;
}

async function authValidationDoctors(req: Request, res:Response, next: NextFunction): Promise<void>  {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded: DecodedToken) => {
    try {
      if (error) throw errors.unauthorizedError();

      const {
        rows: [doctor],
      } = await doctorsRepository.findDoctorById(decoded.doctor_id);

      if (!doctor) throw errors.unauthorizedError();

      res.locals.doctor = doctor;

      next();
    } catch (err) {
      next(err);
    }
  });
}

export default { authValidationDoctors };
