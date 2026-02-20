INSERT INTO user(username, password)
VALUES ('user1', 'hemligtpassword'),
       ('user2', 'superhemligtpassword'),
       ('user3', 'ganskahemligtpassword');

INSERT INTO category(name)
VALUES ('generell'),
       ('mobil'),
       ('dator'),
       ('internet');

INSERT INTO quiz(name, category_id)
VALUES ('initial', 1),
       ('bankID', 2),
       ('iOS', 2),
       ('android', 2),
       ('windows', 3),
       ('linux', 3),
       ('hårdvara', 3),
       ('mjukvara', 3),
       ('webbläsare', 4),
       ('nätverk', 4),
       ('säkerhet', 4);

INSERT INTO quiz_result(user_id, quiz_id)
VALUES (1, 2),
       (1, 5),
       (2, 2),
       (2, 11),
       (3, 11);

INSERT INTO quiz_question(quiz_id, question, multiple_choices)
VALUES (1, 'Vad är syftet med att aktivera tvåfaktorsautentisering på en mobiltelefon?', true),
       (1, 'Är det någon skillnad mellan RAM-minne och lagringsutrymme?', false),
       (1, 'Vad betyder det att en webbplats använder HTTPS istället för HTTP? Flera svar kan vara rätt.', true),
       (2, 'Vilka sätt kan du identifiera dig med bankID? Flera svar kan vara rätt.', true),
       (5, 'Är Windows ett operativsystem?', false),
       (11, 'Vad är ett säkert lösenord?', false),
       (2, 'Är bankID säkert att använda?', false),
       (2, 'Kan seniorer lära sig använda bankID?', false);

INSERT INTO quiz_answer(quiz_question_id, answer, is_correct)
VALUES (1, 'Att förbättra batteritiden', false),
       (1, 'Att lägga till ett extra säkerhetssteg vid inloggning', true),
       (1, 'Att öka mobilens lagringsutrymme', false),
       (1, 'Att göra internetuppkopplingen snabbare', false),
       (2, 'Ja, RAM lagrar filer permanent, lagring används bara tillfälligt', true),
       (2, 'Nej, det är samma sak', false),
       (3, 'Att informationen mellan användaren och webbplatsen är krypterad', true),
       (3, 'Att webbplatsen alltid laddar snabbare', false),
       (3, 'Att anslutningen är säkrare än vanlig HTTP', true),
       (3, 'Att sidan inte kan innehålla virus', false),
       (4, 'Fingeravtryck', true),
       (4, 'Sifferkod', true),
       (4, 'Vinka i kameran', false),
       (4, 'Inget av alternativen', false),
       (5, 'Ja', true),
       (5, 'Nej', false),
       (6, 'Lösenord behövs inte', false),
       (6, 'hej123', false),
       (6, 'Det ska vara kort', false),
       (6, 'Långt och med olika tecken', true),
       (7, 'Ja', true),
       (7, 'Nej', false),
       (8, 'Ja', true),
       (8, 'Nej', false);

INSERT INTO user_answer(quiz_result_id, quiz_question_id, quiz_answer_id)
VALUES (1, 4, 11),
       (1, 4, 12),
       (1, 7, 21),
       (1, 8, 24),
       (2, 5, 16),
       (3, 4, 12),
       (3, 4, 13),
       (4, 6, 20),
       (5, 6, 18);
