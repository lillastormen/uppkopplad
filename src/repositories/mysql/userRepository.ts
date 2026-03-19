import { resolve } from "node:dns";
import mySqlDbConnection from "../../db/mysql.ts";
import type { CreateUserInput, CreatedUser, DbUser, GetUserParamsId, UpdateUserPassword, UpdateUserUsername, UserCredentials } from "../../types/users.ts";
import { rejects } from "node:assert";


export function getUserByUsername(username: string): Promise<CreatedUser | null> {
  return new Promise((resolve, reject) => {
    const sql = `
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

export function getUserById(id: number): Promise<DbUser | null> {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, username, hashed_password
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
    const sql = `
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
    const sql = `
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
    const sql = `
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
  return new Promise<void>((resolve, reject) => {
    const sql = `
      UPDATE user
      SET hashed_password = ? 
      WHERE id = ?
    `;

    const params = [ password, id ];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error)
        return reject(error);
     
      return resolve();
    });
  });
}

export function updateUsername({ id, username }: UpdateUserUsername): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const sql = `
      UPDATE user
      SET username = ? 
      WHERE id = ?
    `;

    const params = [ username, id ];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error)
        return reject(error);
     
      return resolve();
    });
  });
}

export function assignSessionToUser(sessionId: string, userId: number) {
  return new Promise<void>((resolve, reject) => {
    const sql = `
      UPDATE sessions
      SET user_id = ?
      WHERE session_id = ?
  `;

  mySqlDbConnection.query(sql, [ userId, sessionId ], (error: unknown, result: any) => {
    if (error)
      return reject(error);

    return resolve()
  });
});
}


export async function deleteUserById(userId: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {

    mySqlDbConnection.beginTransaction((error) => {
      if (error)
        return reject(error);

      const sqlDeleteUserAnswers = `
        DELETE FROM user_answer 
        WHERE user_answer.quiz_result_id IN (
          SELECT quiz_result.id
          FROM quiz_result 
          WHERE quiz_result.user_id = ?
        )
      `;

      const sqlDeleteResults = `
        DELETE FROM quiz_result 
        WHERE quiz_result.user_id = ?
      `;

      const sqlDeleteSession = `
        DELETE FROM sessions 
        WHERE sessions.user_id = ?
      `;

      const sqlDeleteUser = `
        DELETE FROM user 
        WHERE user.id = ?
      `;


      //creating a monster
      mySqlDbConnection.query(sqlDeleteUserAnswers, [ userId ], (error1) => {
        if (error1) {
          return mySqlDbConnection.rollback(() => reject(error1));
        }

        mySqlDbConnection.query(sqlDeleteResults, [ userId ], (error2) => {
          if (error2) {
            return mySqlDbConnection.rollback(() => reject(error2));
          }

          mySqlDbConnection.query(sqlDeleteSession, [ userId ], (error3) => {
            if (error3) {
              return mySqlDbConnection.rollback(() => reject(error3));
            }

            mySqlDbConnection.query(sqlDeleteUser, [ userId ], (error4) => {
              if (error4) {
                return mySqlDbConnection.rollback(() => reject(error4));
              }

              mySqlDbConnection.commit((commitError) => {
                if (commitError) {
                  return mySqlDbConnection.rollback(() => 
                    reject(commitError)
                  );
                }

                resolve();
              });
            });
          });
        });
      });
    });
  });
}
