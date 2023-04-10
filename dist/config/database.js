/// <reference types="dotenv" />
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pg.Pool;
var configDatabase = {
    connectionString: process.env.DATABASE_URL,
};
if (process.env.MODE === "prod") {
    configDatabase.ssl = true;
}
export var connectionDb = new Pool(configDatabase);
