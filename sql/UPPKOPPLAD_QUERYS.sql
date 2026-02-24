-- Fråga och svar på en specifik quizfråga för en specifik användare
SELECT qr.user_id, qq.question, qa.answer, qa.is_correct
FROM user_answer ua
JOIN quiz_result qr
ON qr.id = ua.quiz_result_id
JOIN quiz_question qq
ON qq.id = ua.quiz_question_id
JOIN quiz_answer qa
ON qa.id = ua.quiz_answer_id
WHERE qr.user_id = 1
AND qa.quiz_question_id = 4;

-- Kollar antal fel på en specifik quizfråga för en specifik användare (1 eller fler fel = fel på frågan)
SELECT COUNT(*)
FROM user_answer ua
JOIN quiz_result qr
ON qr.id = ua.quiz_result_id
JOIN quiz_question qq
ON qq.id = ua.quiz_question_id
JOIN quiz_answer qa
ON qa.id = ua.quiz_answer_id
WHERE qr.user_id = 2
AND qa.quiz_question_id = 4
AND qa.is_correct = false;

-- Fråga och svar på en specifik quizfråga för en specifik användare
SELECT qq.id, qq.question, qa.answer, qq.multiple_choices, qa.is_correct
FROM quiz
JOIN quiz_question qq
ON quiz.id = qq.quiz_id
JOIN quiz_answer qa
ON qq.id = qa.quiz_question_id
WHERE quiz.id = 1

-- Hämtar quizfrågan och dess tillhörande svar+attribut
SELECT
qq.id,
qq.question,
qq.multiple_choices,
JSON_ARRAYAGG(
JSON_OBJECT(
'answer', qa.answer,
'is_correct', qa.is_correct
))
AS answers
FROM quiz_question qq
JOIN quiz_answer qa ON qq.id = qa.quiz_question_id
WHERE qq.quiz_id = 1
GROUP BY qq.id, qq.question, qq.multiple_choices;