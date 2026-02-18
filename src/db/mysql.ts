import mysql from 'mysql2';
import type { ConnectionOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbAccess: ConnectionOptions = {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string
}

const dbConnection = mysql.createConnection(dbAccess);