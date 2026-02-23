import mySqlDbConnection from "../../db/mysql.ts";

export function getQuizById(id: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            SELECT 
            qq.id,
            qq.question,
            qq.multiple_choices,
            JSON_ARRAYAGG(
            JSON_OBJECT(
            'answer', qa.answer,
            'is_correct', qa.is_correct))
            AS answers
            FROM quiz_question qq
            JOIN quiz_answer qa ON qq.id = qa.quiz_question_id
            WHERE qq.quiz_id = ?
            GROUP BY qq.id, qq.question, qq.multiple_choices;
            `;

    mySqlDbConnection.query(sql, [id], (error: unknown, rows: any) => {
      if (error) return reject(error);
      else return resolve(rows);
    });
  });
}
