SELECT * FROM quiz_result
JOIN user_answer
JOIN quiz_answer
WHERE quiz_result.id = quiz_result_id
WHERE