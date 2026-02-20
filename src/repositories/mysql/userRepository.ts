import mySqlDbConnection from "../../db/mysql.ts";
import type { CreateUserInput, CreatedUser } from "../../types/users.ts";

export function createUser({username, password}: CreateUserInput): Promise<CreatedUser> {
    return new Promise((resolve, reject) => {
        let sql = `
            INSERT INTO user (username, password)
            VALUES (?, ?)
        `;

        const params = [username, password];

        mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
            if (error)
                return reject(error)
            else
                return resolve({ id: Number(result.insertId), username });
        })
    })
}