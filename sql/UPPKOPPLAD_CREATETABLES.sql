CREATE SCHEMA IF NOT EXISTS Uppkopplad;

CREATE TABLE user(
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE category(
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE quiz(
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    category_id VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE quiz_result(
    id INT AUTO_INCREMENT,
    user_id VARCHAR(50),
    quiz_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE quiz_question(
    id INT AUTO_INCREMENT,
    quiz_id INT,
    question VARCHAR(200),
    multiple_choices BOOL,
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE quiz_answer(
    id INT AUTO_INCREMENT,
    quiz_question_id INT,
    answer VARCHAR(200),
    is_correct BOOL,
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_question_id) REFERENCES quiz_question(id)
);

CREATE TABLE user_answer(
    id INT AUTO_INCREMENT,
    quiz_result_id INT,
    quiz_answer_id INT,
    quiz_question_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_result_id) REFERENCES quiz_result(id),
    FOREIGN KEY (quiz_answer_id) REFERENCES quiz_answer(id),
    FOREIGN KEY (quiz_question_id) REFERENCES quiz_question(id)
);