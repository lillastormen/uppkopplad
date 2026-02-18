INSERT INTO user(username, password)
VALUES ('user1', 'hemligtpassword'),
       ('user2', 'superhemligtpassword'),
       ('user3', 'ganskahemligtpassword');

INSERT INTO category(name)
VALUES ('dator'),
       ('mobil'),
       ('internet');

INSERT INTO quiz(name, category_name)
VALUES ('bankID', 'mobil'),
       ('iOS', 'mobil'),
       ('android', 'mobil'),
       ('windows', 'dator'),
       ('linux', 'dator'),
       ('hårdvara', 'dator'),
       ('mjukvara', 'dator'),
       ('webbläsare', 'internet'),
       ('nätverk', 'internet'),
       ('säkerhet', 'internet');

INSERT INTO quiz_result(user_username, quiz_id)
VALUES ('user1', 1),
       ('user1', 4),
       ('user2', 1),
       ('user2', 10),
       ('user3', 10);

INSERT INTO quiz_question(quiz_id, question)
VALUES (1, 'Vilka sätt kan du identifiera dig med bankID? Flera svar kan vara rätt.'),
       (4, 'Är Windows ett operativsystem?'),
       (10, 'Vad är ett säkert lösenord?'),
       (1, 'Är bankID säkert att använda?'),
       (1, 'Kan seniorer lära sig använda bankID?')

INSERT INTO quiz_answer(quiz_question_id, answer, is_correct)
VALUES (1, 'Fingeravtryck', true),
       (1, 'Sifferkod', true),
       (1, 'Vinka i kameran', false),
       (1, 'Inget av alternativen', false),
       (2, 'Ja', true),
       (2, 'Nej', false),
       (3, 'Lösenord behövs inte', false),
       (3, 'hej123', false),
       (3, 'Det ska vara kort', false),
       (3, 'Långt och med olika tecken', true),
       (4, 'Ja', true),
       (4, 'Nej', false),
       (5, 'Ja', true),
       (5, 'Nej', false);

INSERT INTO user_answer(quiz_result_id, quiz_question_id, quiz_answer_id)
VALUES (1, 1, 1),
       (1, 1, 2),
       (1, 4, 11),
       (1, 5, 14),
       (2, 2, 6),
       (3, 1, 2),
       (3, 1, 3),
       (4, 3, 10),
       (5, 3, 8);
