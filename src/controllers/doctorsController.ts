import { Request, Response, NextFunction } from "express";
import doctorService from "../services/doctorService.js";

async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, email, password, specialty, city, state } = req.body;
  try {
    await doctorService.create(name, email, password, specialty, city, state);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;
  try {
    const token = await doctorService.signin(email, password);
    res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function findDoctorsBySpecialty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { specialty } = req.body;
  try {
    const doctors = await doctorService.findDoctorBySpecialty(specialty);
    res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function findDoctorsByCity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { city } = req.body;
  try {
    const doctors = await doctorService.findDoctorByCity(city);
    res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function findDoctorsByState(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { state } = req.body;
  try {
    const doctors = await doctorService.findDoctorByState(state);
    res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function findDoctorsByName(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name } = req.body;
  try {
    const doctors = await doctorService.findDoctorByName(name);
    res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function getSchedule(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id, date } = req.body;
  try {
    const schedule = await doctorService.getSchedule(id, date);
    res.send({ schedule });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
  findDoctorsBySpecialty,
  findDoctorsByCity,
  findDoctorsByState,
  findDoctorsByName,
  getSchedule,
};
