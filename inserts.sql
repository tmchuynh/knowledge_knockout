-- Use the database
USE knowledge_knockout_db;

-- Disable foreign key checks temporarily to avoid any potential conflicts with truncating or re-inserting data
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (optional, but useful if you want to reset data)
TRUNCATE TABLE quizzes;
TRUNCATE TABLE questions;
TRUNCATE TABLE answers;

-- Set the length and generate random parts for UUID
SET @DesiredLength = 5; 
SET @FirstChar = CHAR(65 + FLOOR(RAND() * 26));  
SET @UUID = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), CAST(RAND() * (32 - @DesiredLength) AS UNSIGNED) + 1, @DesiredLength));

-- For questions
SET @Q_START = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), CAST(RAND() * (32 - 3) AS UNSIGNED) + 1, 3));
SET @QUESTIONS = CONCAT(@Q_START, '-', @UUID);

-- Random string for answers
SET @ANSWER_RANDOM = SUBSTRING(REPLACE(UUID(), '-', ''), 1, 6);  

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ================================================
-- Chemistry Quiz 
-- ================================================

-- Generate unique quiz IDs for each quiz
SET @UUID_Chemistry_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Chemistry_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Chemistry_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Chemistry_4 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Chemistry_5 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 

-- Insert quizzes with unique 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Chemistry_1, 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 1),
(@UUID_Chemistry_2, 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 2),
(@UUID_Chemistry_3, 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 3),
(@UUID_Chemistry_4, 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 4),
(@UUID_Chemistry_5, 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 5);

-- Level 1 Questions and Answers
SET @Q_Chemistry_1 = CONCAT('1-', @UUID_Chemistry_1, '-Q', FLOOR(RAND() * 1000)); 
SET @A_Chemistry_1 = CONCAT(@Q_Chemistry_1, '-A1');
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q_Chemistry_1, @UUID_Chemistry_1, 'What is the chemical symbol for water?', 'multiple_choice'),
(CONCAT('1-', @UUID_Chemistry_1, '-Q', FLOOR(RAND() * 1000)), @UUID_Chemistry_1, 'True or False: The atomic number of Hydrogen is 1.', 'true_false'),
(CONCAT('1-', @UUID_Chemistry_1, '-Q', FLOOR(RAND() * 1000)), @UUID_Chemistry_1, 'Explain the process of evaporation.', 'written');

-- Answer entries for the questions
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A_Chemistry_1, @Q_Chemistry_1, 'H₂O', 1),
(CONCAT(@Q_Chemistry_1, '-A2'), @Q_Chemistry_1, 'O₂', 0),
(CONCAT(@Q_Chemistry_1, '-A3'), @Q_Chemistry_1, 'CO₂', 0),
(CONCAT(@Q_Chemistry_1, '-A4'), @Q_Chemistry_1, 'NaCl', 0);

-- Level 2 Questions and Answers
SET @Q_Chemistry_2 = CONCAT('2-', @UUID_Chemistry_2, '-Q', FLOOR(RAND() * 1000)); 
SET @A_Chemistry_2 = CONCAT(@Q_Chemistry_2, '-A1');
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q_Chemistry_2, @UUID_Chemistry_2, 'What is the pH value of pure water?', 'multiple_choice'),
(CONCAT('2-', @UUID_Chemistry_2, '-Q', FLOOR(RAND() * 1000)), @UUID_Chemistry_2, 'True or False: Electrons have a positive charge.', 'true_false'),
(CONCAT('2-', @UUID_Chemistry_2, '-Q', FLOOR(RAND() * 1000)), @UUID_Chemistry_2, 'Describe the structure of an atom.', 'written');

-- Answer entries for the level 2 questions
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A_Chemistry_2, @Q_Chemistry_2, '7', 1),
(CONCAT(@Q_Chemistry_2, '-A2'), @Q_Chemistry_2, '0', 0),
(CONCAT(@Q_Chemistry_2, '-A3'), @Q_Chemistry_2, '14', 0),
(CONCAT(@Q_Chemistry_2, '-A4'), @Q_Chemistry_2, 'Neutral', 0);

-- Repeat the same approach for other levels...

-- ================================================
-- Physics Quiz 
-- ================================================

-- Generate unique quiz IDs for each quiz
SET @UUID_Physics_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Physics_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Physics_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 

-- Insert quizzes with unique 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Physics_1, 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 1),
(@UUID_Physics_2, 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 2),
(@UUID_Physics_3, 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 3);

-- Level 1 Questions and Answers
SET @Q_Physics_1 = CONCAT('1-', @UUID_Physics_1, '-Q', FLOOR(RAND() * 1000)); 
SET @A_Physics_1 = CONCAT(@Q_Physics_1, '-A1');
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q_Physics_1, @UUID_Physics_1, 'What is the speed of light in a vacuum?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A_Physics_1, @Q_Physics_1, 'Approximately 3.00 x 10^8 m/s', 1),
(CONCAT(@Q_Physics_1, '-A2'), @Q_Physics_1, 'Approximately 3.00 x 10^6 m/s', 0),
(CONCAT(@Q_Physics_1, '-A3'), @Q_Physics_1, 'Approximately 3.00 x 10^4 m/s', 0),
(CONCAT(@Q_Physics_1, '-A4'), @Q_Physics_1, 'Approximately 3.00 x 10^2 m/s', 0);

-- ================================================
-- Java Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Java_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID
SET @UUID_Java_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); 
SET @UUID_Java_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Java_1, 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 1),
(@UUID_Java_2, 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 2),
(@UUID_Java_3, 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 3);

-- Level 1 Questions and Answers
SET @Q1_Java = CONCAT('1-', @UUID_Java_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Java, @UUID_Java_1, 'Which keyword is used to define a class in Java?', 'multiple_choice');

SET @A1_Java = CONCAT(@Q1_Java, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Java, @Q1_Java, 'class', 1),
(CONCAT(@Q1_Java, '-A2'), @Q1_Java, 'struct', 0),
(CONCAT(@Q1_Java, '-A3'), @Q1_Java, 'define', 0),
(CONCAT(@Q1_Java, '-A4'), @Q1_Java, 'object', 0);

-- Level 2 Questions and Answers
SET @Q2_Java = CONCAT('2-', @UUID_Java_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Java, @UUID_Java_2, 'What does JVM stand for in Java?', 'multiple_choice');

SET @A2_Java = CONCAT(@Q2_Java, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Java, @Q2_Java, 'Java Virtual Machine', 1),
(CONCAT(@Q2_Java, '-A2'), @Q2_Java, 'Java Visual Machine', 0),
(CONCAT(@Q2_Java, '-A3'), @Q2_Java, 'Java Variable Method', 0),
(CONCAT(@Q2_Java, '-A4'), @Q2_Java, 'Java Value Memory', 0);

-- Level 3 Questions and Answers
SET @Q3_Java = CONCAT('3-', @UUID_Java_3, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Java, @UUID_Java_3, 'Which of the following is used for inheritance in Java?', 'multiple_choice');

SET @A3_Java = CONCAT(@Q3_Java, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Java, @Q3_Java, 'extends', 1),
(CONCAT(@Q3_Java, '-A2'), @Q3_Java, 'implements', 0),
(CONCAT(@Q3_Java, '-A3'), @Q3_Java, 'super', 0),
(CONCAT(@Q3_Java, '-A4'), @Q3_Java, 'new', 0);

-- ================================================
-- Python Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Python_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a 5-character unique quiz ID
SET @UUID_Python_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));
SET @UUID_Python_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Python_1, 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 1),
(@UUID_Python_2, 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 2),
(@UUID_Python_3, 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 3);

-- Level 1 Questions and Answers
SET @Q1_Python = CONCAT('1-', @UUID_Python_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Python, @UUID_Python_1, 'What is the correct file extension for Python files?', 'multiple_choice');

SET @A1_Python = CONCAT(@Q1_Python, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Python, @Q1_Python, '.py', 1),
(CONCAT(@Q1_Python, '-A2'), @Q1_Python, '.python', 0),
(CONCAT(@Q1_Python, '-A3'), @Q1_Python, '.pt', 0),
(CONCAT(@Q1_Python, '-A4'), @Q1_Python, '.p', 0);

-- Level 2 Questions and Answers
SET @Q2_Python = CONCAT('2-', @UUID_Python_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Python, @UUID_Python_2, 'What is the correct way to define a function in Python?', 'multiple_choice');

SET @A2_Python = CONCAT(@Q2_Python, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Python, @Q2_Python, 'def function_name():', 1),
(CONCAT(@Q2_Python, '-A2'), @Q2_Python, 'function function_name():', 0),
(CONCAT(@Q2_Python, '-A3'), @Q2_Python, 'function_name = function():', 0),
(CONCAT(@Q2_Python, '-A4'), @Q2_Python, 'def: function_name()', 0);

-- Level 3 Questions and Answers
SET @Q3_Python = CONCAT('3-', @UUID_Python_3, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Python, @UUID_Python_3, 'Which operator is used for exponentiation in Python?', 'multiple_choice');

SET @A3_Python = CONCAT(@Q3_Python, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Python, @Q3_Python, '**', 1),
(CONCAT(@Q3_Python, '-A2'), @Q3_Python, '^', 0),
(CONCAT(@Q3_Python, '-A3'), @Q3_Python, 'exp()', 0),
(CONCAT(@Q3_Python, '-A4'), @Q3_Python, 'pow()', 0);
-- ================================================
-- React Quiz
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_React_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID
SET @UUID_React_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_React_1, 'React Quiz', 'Test your knowledge of React.', 25, 'Web Development', 1),
(@UUID_React_2, 'React Quiz', 'Test your knowledge of React.', 25, 'Web Development', 2);

-- Level 1 Questions and Answers
SET @Q1_React = CONCAT('1-', @UUID_React_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_React, @UUID_React_1, 'What is JSX in React?', 'multiple_choice');

SET @A1_React = CONCAT(@Q1_React, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_React, @Q1_React, 'A syntax extension for JavaScript', 1),
(CONCAT(@Q1_React, '-A2'), @Q1_React, 'A templating language', 0),
(CONCAT(@Q1_React, '-A3'), @Q1_React, 'A database', 0),
(CONCAT(@Q1_React, '-A4'), @Q1_React, 'A CSS framework', 0);

-- Level 2 Questions and Answers
SET @Q2_React = CONCAT('2-', @UUID_React_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_React, @UUID_React_2, 'Which React hook is used to manage state in functional components?', 'multiple_choice');

SET @A2_React = CONCAT(@Q2_React, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_React, @Q2_React, 'useState', 1),
(CONCAT(@Q2_React, '-A2'), @Q2_React, 'useEffect', 0),
(CONCAT(@Q2_React, '-A3'), @Q2_React, 'useContext', 0),
(CONCAT(@Q2_React, '-A4'), @Q2_React, 'useReducer', 0);

-- ================================================
-- Angular Quiz
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Angular_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID
SET @UUID_Angular_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Angular_1, 'Angular Quiz', 'Test your knowledge of Angular.', 25, 'Web Development', 1),
(@UUID_Angular_2, 'Angular Quiz', 'Test your knowledge of Angular.', 25, 'Web Development', 2);

-- Level 1 Questions and Answers
SET @Q1_Angular = CONCAT('1-', @UUID_Angular_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Angular, @UUID_Angular_1, 'What is Angular?', 'multiple_choice');

SET @A1_Angular = CONCAT(@Q1_Angular, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Angular, @Q1_Angular, 'A JavaScript framework', 1),
(CONCAT(@Q1_Angular, '-A2'), @Q1_Angular, 'A CSS framework', 0),
(CONCAT(@Q1_Angular, '-A3'), @Q1_Angular, 'A templating engine', 0),
(CONCAT(@Q1_Angular, '-A4'), @Q1_Angular, 'A database', 0);

-- Level 2 Questions and Answers
SET @Q2_Angular = CONCAT('2-', @UUID_Angular_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Angular, @UUID_Angular_2, 'Which of the following is used to define a module in Angular?', 'multiple_choice');

SET @A2_Angular = CONCAT(@Q2_Angular, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Angular, @Q2_Angular, '@NgModule', 1),
(CONCAT(@Q2_Angular, '-A2'), @Q2_Angular, '@Component', 0),
(CONCAT(@Q2_Angular, '-A3'), @Q2_Angular, '@Injectable', 0),
(CONCAT(@Q2_Angular, '-A4'), @Q2_Angular, '@Directive', 0);

-- Level 3 Questions and Answers
SET @Q3_Angular = CONCAT('3-', @UUID_Angular_1, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Angular, @UUID_Angular_1, 'Which of the following is used for routing in Angular?', 'multiple_choice');

SET @A3_Angular = CONCAT(@Q3_Angular, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Angular, @Q3_Angular, 'RouterModule', 1),
(CONCAT(@Q3_Angular, '-A2'), @Q3_Angular, 'HttpClientModule', 0),
(CONCAT(@Q3_Angular, '-A3'), @Q3_Angular, 'FormsModule', 0),
(CONCAT(@Q3_Angular, '-A4'), @Q3_Angular, 'BrowserModule', 0);

-- ================================================
-- Vue Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Vue_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID
SET @UUID_Vue_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5));

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Vue_1, 'Vue Quiz', 'Test your knowledge of Vue.', 25, 'Web Development', 1),
(@UUID_Vue_2, 'Vue Quiz', 'Test your knowledge of Vue.', 25, 'Web Development', 2);

-- Level 1 Questions and Answers
SET @Q1_Vue = CONCAT('1-', @UUID_Vue_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Vue, @UUID_Vue_1, 'What is Vue.js?', 'multiple_choice');

SET @A1_Vue = CONCAT(@Q1_Vue, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Vue, @Q1_Vue, 'A JavaScript framework', 1),
(CONCAT(@Q1_Vue, '-A2'), @Q1_Vue, 'A CSS framework', 0),
(CONCAT(@Q1_Vue, '-A3'), @Q1_Vue, 'A templating engine', 0),
(CONCAT(@Q1_Vue, '-A4'), @Q1_Vue, 'A database', 0);

-- Level 2 Questions and Answers
SET @Q2_Vue = CONCAT('2-', @UUID_Vue_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Vue, @UUID_Vue_2, 'Which of the following is used to define a component in Vue.js?', 'multiple_choice');

SET @A2_Vue = CONCAT(@Q2_Vue, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Vue, @Q2_Vue, 'Vue.component()', 1),
(CONCAT(@Q2_Vue, '-A2'), @Q2_Vue, '@Component()', 0),
(CONCAT(@Q2_Vue, '-A3'), @Q2_Vue, 'NgComponent()', 0),
(CONCAT(@Q2_Vue, '-A4'), @Q2_Vue, 'React.Component()', 0);

-- Level 3 Questions and Answers
SET @Q3_Vue = CONCAT('3-', @UUID_Vue_1, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Vue, @UUID_Vue_1, 'What is Vuex used for in Vue.js?', 'multiple_choice');

SET @A3_Vue = CONCAT(@Q3_Vue, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Vue, @Q3_Vue, 'State management', 1),
(CONCAT(@Q3_Vue, '-A2'), @Q3_Vue, 'Routing', 0),
(CONCAT(@Q3_Vue, '-A3'), @Q3_Vue, 'Component lifecycle management', 0),
(CONCAT(@Q3_Vue, '-A4'), @Q3_Vue, 'Template rendering', 0);

-- ================================================
-- Psychology Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Psychology_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 1
SET @UUID_Psychology_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2
SET @UUID_Psychology_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2


INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Psychology_1, 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 1),
(@UUID_Psychology_2, 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 2),
(@UUID_Psychology_3, 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 3);

-- Level 1 Questions and Answers
SET @Q1_Psychology = CONCAT('1-', @UUID_Psychology_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Psychology, @UUID_Psychology_1, 'What is the primary focus of cognitive psychology?', 'multiple_choice');

SET @A1_Psychology = CONCAT(@Q1_Psychology, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Psychology, @Q1_Psychology, 'Mental processes like memory, perception, and problem-solving', 1),
(CONCAT(@Q1_Psychology, '-A2'), @Q1_Psychology, 'Human behavior in response to stimuli', 0),
(CONCAT(@Q1_Psychology, '-A3'), @Q1_Psychology, 'Unconscious mind and dream analysis', 0),
(CONCAT(@Q1_Psychology, '-A4'), @Q1_Psychology, 'Behavioral responses to reinforcement', 0);

-- Level 2 Questions and Answers
SET @Q2_Psychology = CONCAT('2-', @UUID_Psychology_1, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Psychology, @UUID_Psychology_1, 'True or False: Sigmund Freud is considered the founder of cognitive psychology.', 'true_false');

SET @A2_Psychology = CONCAT(@Q2_Psychology, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Psychology, @Q2_Psychology, 'False', 1);

-- Level 3 Questions and Answers
SET @Q3_Psychology = CONCAT('3-', @UUID_Psychology_2, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Psychology, @UUID_Psychology_2, 'Which theory is associated with Jean Piaget?', 'multiple_choice');

SET @A3_Psychology = CONCAT(@Q3_Psychology, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Psychology, @Q3_Psychology, 'Stages of cognitive development', 1),
(CONCAT(@Q3_Psychology, '-A2'), @Q3_Psychology, 'Theory of behaviorism', 0),
(CONCAT(@Q3_Psychology, '-A3'), @Q3_Psychology, 'Theory of classical conditioning', 0),
(CONCAT(@Q3_Psychology, '-A4'), @Q3_Psychology, 'Theory of operant conditioning', 0);

-- ================================================
-- Security Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
SET @UUID_Security_1 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 1
SET @UUID_Security_2 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2
SET @UUID_Security_3 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2
SET @UUID_Security_4 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2
SET @UUID_Security_5 = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 5)); -- Create a new unique quiz ID for level 2

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
(@UUID_Security_1, 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 1),
(@UUID_Security_2, 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 2),
(@UUID_Security_3, 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 3),
(@UUID_Security_4, 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 4),
(@UUID_Security_5, 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 5);

-- Level 1 Questions and Answers
SET @Q1_Security = CONCAT('1-', @UUID_Security_1, '-Q1');  -- Create unique question ID for Level 1
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q1_Security, @UUID_Security_1, 'What is a common vulnerability in a web application?', 'multiple_choice');

SET @A1_Security = CONCAT(@Q1_Security, '-A1'); -- Create answer ID for question 1
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A1_Security, @Q1_Security, 'SQL injection', 1),
(CONCAT(@Q1_Security, '-A2'), @Q1_Security, 'Cross-Site Scripting (XSS)', 0),
(CONCAT(@Q1_Security, '-A3'), @Q1_Security, 'Insecure Direct Object References (IDOR)', 0),
(CONCAT(@Q1_Security, '-A4'), @Q1_Security, 'Buffer overflow', 0);

-- Level 2 Questions and Answers
SET @Q2_Security = CONCAT('2-', @UUID_Security_2, '-Q1');  -- Create unique question ID for Level 2
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q2_Security, @UUID_Security_2, 'Which of the following is a potential security risk associated with SQL injection?', 'multiple_choice');

SET @A2_Security = CONCAT(@Q2_Security, '-A1'); -- Create answer ID for question 2
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A2_Security, @Q2_Security, 'Input validation', 1),
(CONCAT(@Q2_Security, '-A2'), @Q2_Security, 'Data encryption', 0),
(CONCAT(@Q2_Security, '-A3'), @Q2_Security, 'Cross-site scripting (XSS)', 0),
(CONCAT(@Q2_Security, '-A4'), @Q2_Security, 'SQL injection', 0);

-- Level 3 Questions and Answers
SET @Q3_Security = CONCAT('3-', @UUID_Security_1, '-Q1');  -- Create unique question ID for Level 3
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q3_Security, @UUID_Security_1, 'Which of the following is a common way to prevent SQL injection?', 'multiple_choice');

SET @A3_Security = CONCAT(@Q3_Security, '-A1'); -- Create answer ID for question 3
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A3_Security, @Q3_Security, 'Prepared statements', 1),
(CONCAT(@Q3_Security, '-A2'), @Q3_Security, 'Input validation', 0),
(CONCAT(@Q3_Security, '-A3'), @Q3_Security, 'Escaping special characters', 0),
(CONCAT(@Q3_Security, '-A4'), @Q3_Security, 'Regular expressions', 0);

-- Level 4 Questions and Answers
SET @Q4_Security = CONCAT('4-', @UUID_Security_2, '-Q1');  -- Create unique question ID for Level 4
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q4_Security, @UUID_Security_2, 'Which of the following is a method used to sanitize user input to prevent SQL injection?', 'multiple_choice');

SET @A4_Security = CONCAT(@Q4_Security, '-A1'); -- Create answer ID for question 4
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A4_Security, @Q4_Security, 'Prepared statements', 0),
(CONCAT(@Q4_Security, '-A2'), @Q4_Security, 'Escaping special characters', 1),
(CONCAT(@Q4_Security, '-A3'), @Q4_Security, 'Regular expressions', 0),
(CONCAT(@Q4_Security, '-A4'), @Q4_Security, 'Input validation', 0);

-- Level 5 Questions and Answers
SET @Q5_Security = CONCAT('5-', @UUID_Security_1, '-Q1');  -- Create unique question ID for Level 5
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
(@Q5_Security, @UUID_Security_1, 'Which of the following is a technique used to detect and prevent SQL injection?', 'multiple_choice');

SET @A5_Security = CONCAT(@Q5_Security, '-A1'); -- Create answer ID for question 5
INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
(@A5_Security, @Q5_Security, 'Input validation', 0),
(CONCAT(@Q5_Security, '-A2'), @Q5_Security, 'SQL injection detection', 1),
(CONCAT(@Q5_Security, '-A3'), @Q5_Security, 'Regular expressions', 0),
(CONCAT(@Q5_Security, '-A4'), @Q5_Security, 'Escaping special characters', 0);
