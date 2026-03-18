import mySqlDbConnection from "../../db/mysql.ts";

export function getQuizById(id: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            SELECT qq.id, qq.question, qq.multiple_choices,
            JSON_ARRAYAGG(
            JSON_OBJECT(
            'qq_id', qq.id,
            'qa_id', qa.id,
            'answer', qa.answer,
            'is_correct', qa.is_correct
            ))
            AS answers
            FROM quiz_question qq
            JOIN quiz_answer qa ON qq.id = qa.quiz_question_id
            WHERE qq.quiz_id = ?
            GROUP BY qq.id, qq.question, qq.multiple_choices;`;

    mySqlDbConnection.query(sql, [id], (error: unknown, rows: any) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

export function createQuizResult(quizId: number, userId: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            INSERT IGNORE INTO quiz_result (quiz_id, user_id)
            VALUES (?, ?)
        `;

    const params = [quizId, userId];

    mySqlDbConnection.query(sql, params, (error: unknown, result: any) => {
      if (error) reject(error);
      const id = result.insertId;
      resolve(id);
    });
  });
}

export function getQuizResultById(quizId: number, userId: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            SELECT qr.id FROM quiz_result qr
            WHERE qr.quiz_id = ? AND qr.user_id = ?;`;

    const params = [quizId, userId];

    mySqlDbConnection.query(sql, params, (error: unknown, rows: any) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

export function deleteUserAnswersByQuizResultId(quizResultId: number) {
  return new Promise((resolve, reject) => {
    let sql = `
            DELETE FROM user_answer ua
            WHERE quiz_result_id = ?;`;

    mySqlDbConnection.query(
      sql,
      [quizResultId],
      (error: unknown, rows: any) => {
        if (error) reject(error);
        resolve(rows);
      },
    );
  });
}

export function createUserAnswer(
  quizResultId: number,
  quizQuestionId: number,
  quizAnswerId: number,
) {
  return new Promise((resolve, reject) => {
    let sql = `
            INSERT INTO user_answer (quiz_Result_Id, quiz_Question_Id, quiz_Answer_Id)
            VALUES (?, ?, ?)
        `;

    const params = [quizResultId, quizQuestionId, quizAnswerId];

    mySqlDbConnection.query(sql, params, (error: unknown, rows: any) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}
