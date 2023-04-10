import { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService.js";

async function createPatient(req: Request, res:Response, next: NextFunction): Promise<void>  {
  const { name, email, password } = req.body;
  try {
    await patientService.createPatient(name, email, password);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: Request, res:Response, next: NextFunction): Promise<void>  {
  const { email, password } = req.body;
  try {
    const token = await patientService.signin(email, password);
    res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  createPatient,
  signin,
};
