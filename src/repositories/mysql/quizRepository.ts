import mySqlDbConnection from "../../db/mysql.ts";

export function getQuizById(id: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            SELECT * FROM quiz WHERE ID = ?
        `;

    mySqlDbConnection.query(sql, [id], (error: unknown, rows: any) => {
      if (error) return reject(error);
      else return resolve(rows);
    });
  });
}
