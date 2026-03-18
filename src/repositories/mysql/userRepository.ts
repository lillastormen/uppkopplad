import { resolve } from "node:dns";
import mySqlDbConnection from "../../db/mysql.ts";
import type { CreateUserInput, CreatedUser, GetUserParamsId, UpdateUserPassword, UpdateUserUsername, UserCredentials } from "../../types/users.ts";
import { rejects } from "node:assert";

export function getUserByUsername(username: string): Promise<CreatedUser | null> {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT username, hashed_password
      FROM user
      WHERE username = ? 
      LIMIT 1
  `;

    mySqlDbConnection.query(sql,[username], (error: unknown, result: any[]) => {
      if (error) 
        return reject(error);
      else 
        return resolve(result?.[0] ?? null);
    });
  });
}

export function getUserById(id: number) {
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
    });
  });
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
    });
  });
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
    });
  });
}

export function createUser({ username, password }: CreateUserInput): Promise<CreatedUser> {
  return new Promise((resolve, reject) => {
    let sql = `
      INSERT INTO user (username, hashed_password)
      VALUES (?, ?)
    `;

    const params = [username, password];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error) 
        return reject(error);
      else 
        return resolve({ id: Number(result.insertId), username });
    });
  });
}

export function updatePassword({ id, password }: UpdateUserPassword): Promise<any> {
  return new Promise((resolve, reject) => {
    let sql = `
      UPDATE user
      SET hashed_password = ? 
      WHERE id = ?
    `;

    const params = [ password, id ];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error)
        return reject(error);
     
      return resolve(result);
    });
  });
}

export function updateUsername({ id, username }: UpdateUserUsername): Promise<any> {
  return new Promise((resolve, reject) => {
    let sql = `
      UPDATE user
      SET username = ? 
      WHERE id = ?
    `;

    const params = [ username, id ];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error)
        return reject(error);
     
      return resolve(result);
    });
  });
}

export function deleteUserById(userId: number) {
  return new Promise((resolve, reject) => {
    let sql = `
      DELETE * FROM user
      WHERE id = ?
    `;

    const id = [ userId ];

    mySqlDbConnection.query(sql, id, (error: unknown, result: any) => {
      if (error)
        return reject(error);

      return resolve(result);
    });
  });
}

export async function assignSessionToUser(sessionId: string, userId: number) {
  return new Promise((resolve, reject) => {
    let sql = `
      UPDATE sessions
      SET user_id = ?
      WHERE session_id = ?
  `;

  mySqlDbConnection.query(sql, [ userId, sessionId ], (error: unknown, result: any) => {
    if (error)
      return reject(error);

    return resolve(result)
  });
});
}
