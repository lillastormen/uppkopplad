import mysql from 'mysql2';
import type { ConnectionOptions, Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const mySqlDbAccess: ConnectionOptions = {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string
}

const mySqlDbConnection: Connection = mysql.createConnection(mySqlDbAccess);


export function connectMySQL(): Promise<void> {
    return new Promise((resolve, reject) => {
        mySqlDbConnection.connect((error) => {
            if(error)
                return reject(error);
            resolve();
        })
    })
}

export default mySqlDbConnection;