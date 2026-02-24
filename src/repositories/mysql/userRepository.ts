import mySqlDbConnection from "../../db/mysql.ts";
import type { CreateUserInput, CreatedUser, UserCredentials } from "../../types/users.ts";



export function getUserByUsername(username: string): Promise<CreatedUser | null> {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT username, hashed_password
            FROM user
            WHERE username = ? 
            LIMIT 1
        `;

        mySqlDbConnection.query(sql, [username], (error: unknown, result: any[]) => {
            if (error)
                return reject(error);

            else
                return resolve(result?.[0] ?? null);
        })
    })
}

export function getUserById(id: Number): Promise<CreatedUser | null> {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT id, username
            FROM user
            WHERE id = ? 
            LIMIT 1
        `;

        mySqlDbConnection.query(sql, [id], (error: unknown, result: any[]) => {
            if (error)
                return reject(error);
            else
                return resolve(result?.[0] ?? null);
        })
    })
}

export function getUserCredentials(username: string): Promise<UserCredentials> {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT id, username, hashed_password AS password
            FROM user
            WHERE username = ?
            LIMIT 1
        `;

        mySqlDbConnection.query(sql, [username], (error: unknown, result: any[]) => {
            if (error)
                return reject(error);
            else
                return resolve(result?.[0] ?? null);
        })
    })
}

export function getAllUsers(): Promise<void> {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT id, username
            FROM user
            ORDER BY id ASC
        `;

        mySqlDbConnection.query(sql, (error: unknown, result: any) => {
            if (error) 
                return reject(error);
            else
                return resolve(result);
        })
    })
}

export function createUser({username, password}: CreateUserInput): Promise<CreatedUser> {
    return new Promise((resolve, reject) => {
        let sql = `
            INSERT INTO user (username, hashed_password)
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