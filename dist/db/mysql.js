import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const mySqlDbAccess = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const mySqlDbConnection = mysql.createConnection(mySqlDbAccess);
export default mySqlDbConnection;
//# sourceMappingURL=mysql.js.map