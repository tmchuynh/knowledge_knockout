-- Use the database
USE knowledge_knockout_db;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (optional)
TRUNCATE TABLE answers;

TRUNCATE TABLE questions;

TRUNCATE TABLE quizzes;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Create a function to generate random alphanumeric strings
DROP FUNCTION IF EXISTS random_string;

DELIMITER $$

CREATE FUNCTION random_string(n INT) RETURNS VARCHAR(255)
BEGIN
    DECLARE chars_str VARCHAR(100) DEFAULT 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    DECLARE result VARCHAR(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < n DO
        SET result = CONCAT(result, SUBSTRING(chars_str, FLOOR(1 + RAND() * LENGTH(chars_str)), 1));
        SET i = i + 1;
    END WHILE;
    RETURN result;
END$$

DELIMITER;

-- Insert quizzes
INSERT INTO
    quizzes (
        quiz_id,
        name,
        description,
        total_questions,
        category,
        level
    )
VALUES
    -- Chemistry Quiz
    (
        random_string (5),
        'Chemistry Quiz',
        'Test your knowledge of Chemistry.',
        15,
        'Science',
        1
    ),
    -- Biology Quiz
    (
        random_string (5),
        'Biology Quiz',
        'Test your knowledge of Biology.',
        15,
        'Science',
        1
    ),
    -- Physics Quiz
    (
        random_string (5),
        'Physics Quiz',
        'Test your knowledge of Physics.',
        15,
        'Science',
        1
    ),
    -- Java Quiz
    (
        random_string (5),
        'Java Quiz',
        'Test your knowledge of Java programming.',
        15,
        'Programming',
        1
    ),
    -- Python Quiz
    (
        random_string (5),
        'Python Quiz',
        'Test your knowledge of Python programming.',
        15,
        'Programming',
        1
    ),
    -- React Quiz
    (
        random_string (5),
        'React Quiz',
        'Test your knowledge of React framework.',
        15,
        'Web Development',
        1
    ),
    -- Angular Quiz
    (
        random_string (5),
        'Angular Quiz',
        'Test your knowledge of Angular framework.',
        15,
        'Web Development',
        1
    ),
    -- Vue Quiz
    (
        random_string (5),
        'Vue Quiz',
        'Test your knowledge of Vue.js.',
        15,
        'Web Development',
        1
    ),
    -- Philosophy Quiz
    (
        random_string (5),
        'Philosophy Quiz',
        'Test your knowledge of Philosophy.',
        15,
        'Humanities',
        1
    ),
    -- Psychology Quiz
    (
        random_string (5),
        'Psychology Quiz',
        'Test your knowledge of Psychology.',
        15,
        'Social Science',
        1
    ),
    -- Design Quiz
    (
        random_string (5),
        'Design Quiz',
        'Test your knowledge of Design principles.',
        15,
        'Art',
        1
    ),
    -- Security Quiz
    (
        random_string (5),
        'Security Quiz',
        'Test your knowledge of Security concepts.',
        15,
        'IT',
        1
    );

-- Now retrieve the inserted quizzes to use their IDs
SELECT quiz_id INTO @quiz_id1
FROM quizzes
WHERE
    name = 'Chemistry Quiz';

SELECT quiz_id INTO @quiz_id2
FROM quizzes
WHERE
    name = 'Biology Quiz';

SELECT quiz_id INTO @quiz_id3
FROM quizzes
WHERE
    name = 'Physics Quiz';

SELECT quiz_id INTO @quiz_id4 FROM quizzes WHERE name = 'Java Quiz';

SELECT quiz_id INTO @quiz_id5
FROM quizzes
WHERE
    name = 'Python Quiz';

SELECT quiz_id INTO @quiz_id6 FROM quizzes WHERE name = 'React Quiz';

SELECT quiz_id INTO @quiz_id7
FROM quizzes
WHERE
    name = 'Angular Quiz';

SELECT quiz_id INTO @quiz_id8 FROM quizzes WHERE name = 'Vue Quiz';

SELECT quiz_id INTO @quiz_id9
FROM quizzes
WHERE
    name = 'Philosophy Quiz';

SELECT quiz_id INTO @quiz_id10
FROM quizzes
WHERE
    name = 'Psychology Quiz';

SELECT quiz_id INTO @quiz_id11
FROM quizzes
WHERE
    name = 'Design Quiz';

SELECT quiz_id INTO @quiz_id12
FROM quizzes
WHERE
    name = 'Security Quiz';

-- Insert questions and answers for each quiz
-- We will use a procedure to automate this

DROP PROCEDURE IF EXISTS insert_questions_and_answers;

DELIMITER $$

CREATE PROCEDURE insert_questions_and_answers(IN quiz_id VARCHAR(5))
BEGIN
    DECLARE level INT DEFAULT 1;
    WHILE level <= 3 DO
        DECLARE question_in_level INT DEFAULT 1;
        WHILE question_in_level <= 5 DO
            SET @random_question_part = random_string(5);
            SET @question_id = CONCAT(level, '-', quiz_id, '-', @random_question_part);
            SET @question_type = CASE (question_in_level % 3)
                WHEN 1 THEN 'multiple_choice'
                WHEN 2 THEN 'true_false'
                ELSE 'written'
            END;
            SET @question_content = CONCAT('Sample question ', @question_id, ' for quiz ', quiz_id, ', Level ', level);
            INSERT INTO questions (question_id, quiz_id, content, question_type)
            VALUES (@question_id, quiz_id, @question_content, @question_type);

            IF @question_type = 'multiple_choice' THEN
                -- Insert 4 answers
                SET @answer_counter = 1;
                WHILE @answer_counter <= 4 DO
                    SET @random_answer_part = random_string(5);
                    SET @question_random_part = SUBSTRING_INDEX(@question_id, '-', -1);
                    SET @answer_id = CONCAT(@question_random_part, '-', @random_answer_part);
                    SET @is_correct = IF(@answer_counter = 1, 1, 0);
                    SET @answer_content = CONCAT('Answer ', @answer_counter, ' for question ', @question_id);
                    INSERT INTO answers (answer_id, question_id, content, is_correct)
                    VALUES (@answer_id, @question_id, @answer_content, @is_correct);
                    SET @answer_counter = @answer_counter + 1;
                END WHILE;
            ELSEIF @question_type = 'true_false' THEN
                -- Insert one answer
                SET @random_answer_part = random_string(5);
                SET @question_random_part = SUBSTRING_INDEX(@question_id, '-', -1);
                SET @answer_id = CONCAT(@question_random_part, '-', @random_answer_part);
                SET @is_correct = IF(MOD(question_in_level, 2) = 0, 1, 0);
                INSERT INTO answers (answer_id, question_id, content, is_correct)
                VALUES (@answer_id, @question_id, 'True', @is_correct);
            END IF;

            SET question_in_level = question_in_level + 1;
        END WHILE;
        SET level = level + 1;
    END WHILE;
END$$

DELIMITER;

-- Call the procedure for each quiz
CALL insert_questions_and_answers (@quiz_id1);

CALL insert_questions_and_answers (@quiz_id2);

CALL insert_questions_and_answers (@quiz_id3);

CALL insert_questions_and_answers (@quiz_id4);

CALL insert_questions_and_answers (@quiz_id5);

CALL insert_questions_and_answers (@quiz_id6);

CALL insert_questions_and_answers (@quiz_id7);

CALL insert_questions_and_answers (@quiz_id8);

CALL insert_questions_and_answers (@quiz_id9);

CALL insert_questions_and_answers (@quiz_id10);

CALL insert_questions_and_answers (@quiz_id11);

CALL insert_questions_and_answers (@quiz_id12);

-- Clean up
DROP PROCEDURE IF EXISTS insert_questions_and_answers;

DROP FUNCTION IF EXISTS random_string;