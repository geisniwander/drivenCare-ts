import errors from "../errors/index.js";
import "dotenv/config";
import appointmentsRepository from "../repositories/appointmentsRepository.js";

async function createAppointment(id:number, doctor_id: number, date: Date, hour: string): Promise<void> {
  const validHour = /^([01]\d|2[0-3]):(00|30)(:[0-5]\d)?$/i.test(hour);
  const [hourString, minuteString] = hour.split(":");
  const hourNumber = parseInt(hourString, 10);
  const minuteNumber = parseInt(minuteString, 10);

  if (
    !validHour ||
    hourNumber < 7 ||
    hourNumber >= 18 ||
    (minuteNumber !== 0 && minuteNumber !== 30)
  ) {
    throw errors.ConflictDateError(date);
  }

  const { rowCount } = await appointmentsRepository.findAppointmentsByDate(
    doctor_id,
    date,
    hour
  );
  if (rowCount) throw errors.ConflictDateError(date);

  await appointmentsRepository.createAppointment(id, doctor_id, date, hour);
}

async function cancelAppointment(appointment_id: number, id: number): Promise<void> {
  const { rowCount } = await appointmentsRepository.findAppointmentsById(
    appointment_id,
    id,
  );
  if (!rowCount) throw errors.invalidAppointmentError();

  await appointmentsRepository.cancelAppointment(appointment_id, id);
}

async function finishAppointment(appointment_id: number, id: number): Promise<void> {
  const { rowCount } = await appointmentsRepository.findAppointmentsById(
    appointment_id,
    id,
  );
  if (!rowCount) throw errors.invalidAppointmentError();

  await appointmentsRepository.finishAppointment(appointment_id, id);
}

async function findAppointmentsByPatientId(id: number){
  const { rowCount, rows } =
    await appointmentsRepository.findAppointmentsByPatientId(id);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findAppointmentsFinishedByPatient(id: number) {
  const { rowCount, rows } =
    await appointmentsRepository.findAppointmentsFinishedByPatient(id);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findAppointmentsFinishedByDoctor(id: number) {
  const { rowCount, rows } =
    await appointmentsRepository.findAppointmentsFinishedByDoctor(id);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findAppointmentsByDoctorId(id: number) {
  const { rowCount, rows } =
    await appointmentsRepository.findAppointmentsByDoctorId(id);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

export default {
  createAppointment,
  cancelAppointment,
  findAppointmentsByPatientId,
  findAppointmentsByDoctorId,
  findAppointmentsFinishedByPatient,
  findAppointmentsFinishedByDoctor,
  finishAppointment,
};
