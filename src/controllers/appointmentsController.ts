import { Request, Response, NextFunction } from "express";
import appointmentService from "../services/appointmentService.js";

async function createAppointment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.patient;
  const { doctor_id, date, hour } = req.body;

  try {
    await appointmentService.createAppointment(
      Number(id),
      Number(doctor_id),
      date,
      hour
    );
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function cancelAppointment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.doctor;
  const { appointment_id } = req.params;
  try {
    await appointmentService.cancelAppointment(
      Number(appointment_id),
      Number(id)
    );
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function finishAppointment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.doctor;

  const { appointment_id } = req.params;

  try {
    await appointmentService.finishAppointment(
      Number(appointment_id),
      Number(id)
    );
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAppointmentsByDoctorId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.doctor;
  try {
    const appointments = await appointmentService.findAppointmentsByDoctorId(
      id
    );

    res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function findAppointmentsFinishedByDoctor(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.doctor;

  try {
    const appointments =
      await appointmentService.findAppointmentsFinishedByDoctor(id);

    res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function findAppointmentsFinishedByPatient(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.patient;

  try {
    const appointments =
      await appointmentService.findAppointmentsFinishedByPatient(id);

    res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function findAppointmentsByPatientId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.patient;

  try {
    const appointments = await appointmentService.findAppointmentsByPatientId(
      id
    );

    res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

export default {
  createAppointment,
  cancelAppointment,
  findAppointmentsByPatientId,
  findAppointmentsByDoctorId,
  finishAppointment,
  findAppointmentsFinishedByPatient,
  findAppointmentsFinishedByDoctor,
};
