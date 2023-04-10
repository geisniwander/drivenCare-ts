import { Request, Response, NextFunction } from "express";
import errors from "../errors/index.js";
import patientsRepository from "../repositories/patientsRepository.js";
import jwt from "jsonwebtoken";

interface DecodedToken {
  patient_id: number;
}

async function authValidationPatients(req: Request, res:Response, next: NextFunction): Promise<void>  {
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
        rows: [patient],
      } = await patientsRepository.findPatientById(decoded.patient_id);

      if (!patient) throw errors.unauthorizedError();

      res.locals.patient = patient;

      next();
    } catch (err) {
      next(err);
    }
  });
}

export default { authValidationPatients };
