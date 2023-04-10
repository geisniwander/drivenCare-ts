/// <reference types="dotenv" />
import pg, { PoolConfig } from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

interface CustomPoolConfig extends PoolConfig {
  ssl?: boolean;
  [key: string]: any;
}

const configDatabase: CustomPoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "prod") {
  configDatabase.ssl = true;
}

export const connectionDb = new Pool(configDatabase);