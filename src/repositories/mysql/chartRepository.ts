import mySqlDbConnection from "../../db/mysql.ts";

export async function getUSerAccuracyByCategory(userId: number) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                c.name AS category,
                COUNT(*) AS total,
                SUM(IF(qa.is_correct = 1, 1, 0)) AS correct,
                ROUND(
                    SUM(IF(qa.is_correct = 1, 1, 0)) * 100.0 / COUNT(*),
                    0
                ) AS accuracy
            FROM user_answer ua
            JOIN quiz_answer qa ON ua.quiz_answer_id = qa.id
            JOIN quiz_question qq ON ua.quiz_question_id = qq.id
            JOIN quiz q ON qq.quiz_id = q.id
            JOIN category c ON q.category_id = c.id
            JOIN quiz_result qr ON ua.quiz_result_id = qr.id
            WHERE qr.user_id = ?
            GROUP BY c.name;
        `;

        mySqlDbConnection.query(sql, [userId], (error: unknown, rows: any) => {
            if (error) 
                return reject(error);
            resolve(rows);
        });
    });
}