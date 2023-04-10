import bcrypt from "bcrypt";
import doctorsRepository from "../repositories/doctorsRepository.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import patientsRepository from "../repositories/patientsRepository.js";

async function create(
  name: string,
  email: string,
  password: string,
  specialty: string,
  city: string,
  state: string
): Promise<void> {
  const { rowCount } = await doctorsRepository.findDoctorByEmail(email);
  const patientCount = (await patientsRepository.findPatientByEmail(email))
    .rowCount;
  if (rowCount || patientCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await doctorsRepository.create(
    name,
    email,
    password = hashPassword,
    specialty,
    city,
    state,
  );
}

async function signin(email: string, password: string): Promise<string> {
  const {
    rowCount,
    rows: [doctor],
  } = await doctorsRepository.findDoctorByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, doctor.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ doctor_id: doctor.id }, process.env.SECRET_KEY, {
    expiresIn: 86400,
  });

  return token;
}

async function findDoctorByCity(city: string) {
  const { rowCount, rows } = await doctorsRepository.findDoctorByCity(city);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findDoctorByState(state: string) {
  const { rowCount, rows } = await doctorsRepository.findDoctorByState(state);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findDoctorBySpecialty(specialty: string) {
  const { rowCount, rows } = await doctorsRepository.findDoctorBySpecialty(
    specialty
  );
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function findDoctorByName(name: string) {
  const { rowCount, rows } = await doctorsRepository.findDoctorByName(name);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

async function getSchedule(id: number, date: Date) {
  const { rowCount, rows } = await doctorsRepository.getSchedule(id, date);
  if (!rowCount) throw errors.notFoundError();

  return rows;
}

export default {
  create,
  signin,
  findDoctorByCity,
  findDoctorByState,
  findDoctorBySpecialty,
  findDoctorByName,
  getSchedule,
};
