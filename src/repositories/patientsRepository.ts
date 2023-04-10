import {connectionDb} from "../config/database.js";
import { QueryResult } from "pg";

async function findPatientByEmail(email: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT * FROM "public.patients" WHERE email=$1
  `,
    [email]
  );
  return result;

}

async function createPatient(name: string, email: string, password: string): Promise<QueryResult> {
  const result = await connectionDb.query(
    `
        INSERT INTO "public.patients" (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
  return result;

}

async function findPatientById(id: Number): Promise<QueryResult> {
  const result = await connectionDb.query(
    `    
    SELECT * FROM "public.patients" WHERE id=$1
  `,
    [id]
  );
  return result;

}

export default {
  findPatientByEmail,
  createPatient,
  findPatientById,
};
