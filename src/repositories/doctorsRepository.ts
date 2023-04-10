import { connectionDb } from "../config/database.js";
import { QueryResult } from "pg";

async function findDoctorByEmail(email: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT * FROM "public.doctors" WHERE email=$1
  `,
    [email]
  );
  return result;
}

async function create(
  name: string,
  email: string,
  password: string,
  specialty: string,
  city: string,
  state: string
): Promise<QueryResult> {
  const result = await connectionDb.query(
    `
        INSERT INTO "public.doctors" (name, email, password, specialty, city, state)
        VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      name,
      email,
      password,
      specialty.toLowerCase(),
      city.toLowerCase(),
      state.toLowerCase(),
    ]
  );
  return result;
}

async function findDoctorById(id: Number): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT * FROM "public.doctors" WHERE id=$1
  `,
    [id]
  );
  return result;
}

async function findDoctorBySpecialty(specialty: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT name, email, specialty, city, state FROM "public.doctors" WHERE specialty ILIKE $1 || '%'
  `,
    [specialty.toLowerCase()]
  );
  return result;
}

async function findDoctorByCity(city: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT name, email, specialty, city, state FROM "public.doctors" WHERE city=$1
  `,
    [city.toLowerCase()]
  );
  return result;
}

async function findDoctorByState(state: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT name, email, specialty, city, state FROM "public.doctors" WHERE state=$1
  `,
    [state.toLowerCase()]
  );
  return result;
}

async function findDoctorByName(name: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT id, name, email, specialty, city, state FROM "public.doctors" WHERE name ILIKE $1 || '%'
  `,
    [name.toLowerCase()]
  );
  return result;
}

async function getSchedule(id: Number, date: Date): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT slots.time
    FROM (
      SELECT generate_series(
        $1::timestamp,
        $1::timestamp + interval '11 hours',
        '30 minutes'::interval
      ) AS time
    ) AS slots
    LEFT JOIN "public.appointments" AS a
    ON a.doctor_id = $2
    AND a.date = $3
    AND slots.time BETWEEN (a.date || ' ' || a.time)::timestamp - interval '29 minutes'
    AND (a.date || ' ' || a.time)::timestamp + interval '29 minutes'
    WHERE a.id IS NULL;  `,
    [`${date} 07:00:00`, id, date]
  );
  return result;
}

export default {
  findDoctorByEmail,
  create,
  findDoctorById,
  findDoctorBySpecialty,
  findDoctorByCity,
  findDoctorByState,
  findDoctorByName,
  getSchedule,
};
