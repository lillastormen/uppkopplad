import mysql from 'mysql2';
import type { ConnectionOptions, Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

//function to figure out which one of the var is not loading correctly (got it...trololo)
export function reqEnv(name: string): string {

    const varEnv = process.env[name];

    if(!varEnv) 
        throw new Error(`${name} is not set`);
    return varEnv;
}

const mySqlDbAccess: ConnectionOptions = {
    host: reqEnv('DB_HOST'),
    port: Number(process.env.DB_PORT),
    user: reqEnv('DB_USER'),
    password: reqEnv('DB_PASSWORD'),
    database: reqEnv('DB_DATABASE')
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