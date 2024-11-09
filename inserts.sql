-- Use the database
USE knowledge_knockout_db;

-- Disable foreign key checks temporarily to avoid any potential conflicts with truncating or re-inserting data
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (optional, but useful if you want to reset data)
TRUNCATE TABLE quizzes;
TRUNCATE TABLE questions;
TRUNCATE TABLE answers;

SET @DesiredLength = 5;
SET @RandomString = LOWER(SUBSTRING(REPLACE(UUID(), '-', ''), CAST(RAND() * (32 - @DesiredLength) AS UNSIGNED) + 1, @DesiredLength));


-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ================================================
-- Chemistry Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1ds2C', 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 1),
('2fsdf', 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 2),
('3sfe3', 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 3),
('4dsf2', 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 4),
('5d3gf', 'Chemistry Quiz', 'Test your knowledge of Chemistry.', 25, 'STEM', 5);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1ds2C-Q1W2E', '1ds2C', 'What is the chemical symbol for water?', 'multiple_choice'),
('1-1ds2C-Q3R4T', '1ds2C', 'True or False: The atomic number of Hydrogen is 1.', 'true_false'),
('1-1ds2C-Q5Y6U', '1ds2C', 'Explain the process of evaporation.', 'written');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('Q1W2E-A1S2D', '1-1ds2C-Q1W2E', 'H₂O', 1),
('Q1W2E-F3G4H', '1-1ds2C-Q1W2E', 'O₂', 0),
('Q1W2E-J5K6L', '1-1ds2C-Q1W2E', 'CO₂', 0),
('Q1W2E-Z7X8C', '1-1ds2C-Q1W2E', 'NaCl', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2fsdf-Q1S2D', '2fsdf', 'What is the pH value of pure water?', 'multiple_choice'),
('2-2fsdf-Q3F4G', '2fsdf', 'True or False: Electrons have a positive charge.', 'true_false'),
('2-2fsdf-Q5H6J', '2fsdf', 'Describe the structure of an atom.', 'written');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('Q1S2D-L1K2J', '2-2fsdf-Q1S2D', '7', 1),
('Q1S2D-H3G4F', '2-2fsdf-Q1S2D', '0', 0),
('Q1S2D-D5S6A', '2-2fsdf-Q1S2D', '14', 0),
('Q1S2D-Z7X8C', '2-2fsdf-Q1S2D', 'Neutral', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3sfe3-Q1C2V', '3sfe3', 'What is the molar mass of carbon dioxide (CO₂)?', 'multiple_choice'),
('3-3sfe3-Q3B4N', '3sfe3', 'True or False: Isotopes have the same number of neutrons.', 'true_false'),
('3-3sfe3-Q5M6Q', '3sfe3', 'Explain the law of conservation of mass.', 'written');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('Q1C2V-B1N2M', '3-3sfe3-Q1C2V', '44 g/mol', 1),
('Q1C2V-Q3W4E', '3-3sfe3-Q1C2V', '18 g/mol', 0),
('Q1C2V-R5T6Y', '3-3sfe3-Q1C2V', '28 g/mol', 0),
('Q1C2V-U7I8O', '3-3sfe3-Q1C2V', '32 g/mol', 0);

-- Level 4 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('4-4dsf2-Q1Y2U', '4dsf2', 'What is Avogadro\'s number?', 'multiple_choice'),
('4-4dsf2-Q3I4O', '4dsf2', 'True or False: Enzymes are proteins that act as catalysts.', 'true_false'),
('4-4dsf2-Q5P6A', '4dsf2', 'Discuss the difference between endothermic and exothermic reactions.', 'written');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('Q1Y2U-L0K9J', '4-4dsf2-Q1Y2U', '6.022 x 10²³', 1),
('Q1Y2U-H8G7F', '4-4dsf2-Q1Y2U', '3.14', 0),
('Q1Y2U-D6S5A', '4-4dsf2-Q1Y2U', '9.81 m/s²', 0),
('Q1Y2U-Z4X3C', '4-4dsf2-Q1Y2U', '1.6 x 10⁻¹⁹', 0);

-- Level 5 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('5-5d3gf-Q1H2J', '5d3gf', 'Calculate the number of moles in 22 grams of CO₂.', 'multiple_choice'),
('5-5d3gf-Q3K4L', '5d3gf', 'True or False: A catalyst increases the activation energy of a reaction.', 'true_false'),
('5-5d3gf-Q5Z6X', '5d3gf', 'Explain Le Chatelier\'s principle.', 'written');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('Q1H2J-M3N4B', '5-5d3gf-Q1H2J', '0.5 moles', 1),
('Q1H2J-V5C6X', '5-5d3gf-Q1H2J', '1 mole', 0),
('Q1H2J-Z7A8S', '5-5d3gf-Q1H2J', '2 moles', 0),
('Q1H2J-D9F0G', '5-5d3gf-Q1H2J', '0.05 moles', 0);


-- ================================================
-- Physics Quiz 
-- ================================================

INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1f3sx', 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 1),
('2ds3f', 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 2),
('3sf3s', 'Physics Quiz', 'Test your knowledge of Physics.', 25, 'STEM', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1f3sx-BVCXZ', '1f3sx', 'What is the speed of light in a vacuum?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('BVCXZ-MLKJN', '1-1f3sx-BVCXZ', 'Approximately 3.00 x 10^8 m/s', 1),
('BVCXZ-HGFDS', '1-1f3sx-BVCXZ', 'Approximately 3.00 x 10^6 m/s', 0),
('BVCXZ-ASDFG', '1-1f3sx-BVCXZ', 'Approximately 3.00 x 10^4 m/s', 0),
('BVCXZ-QWERT', '1-1f3sx-BVCXZ', 'Approximately 3.00 x 10^2 m/s', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2ds3f-ASDFG', '2ds3f', 'What is the formula for calculating force?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '2-2ds3f-ASDFG', 'F = ma', 1),
('ASDFG-ZXCVB', '2-2ds3f-ASDFG', 'F = mv²', 0),
('ASDFG-POIUY', '2-2ds3f-ASDFG', 'F = m/g', 0),
('ASDFG-HGFDS', '2-2ds3f-ASDFG', 'F = m/a', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3sf3s-QWERT', '3sf3s', 'What is the law of conservation of energy?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-POIUY', '3-3sf3s-QWERT', 'Energy cannot be created or destroyed', 1),
('QWERT-ASDFG', '3-3sf3s-QWERT', 'Energy can be destroyed', 0),
('QWERT-ZXCVB', '3-3sf3s-QWERT', 'Energy can be created', 0),
('QWERT-HGFDS', '3-3sf3s-QWERT', 'Energy can only change forms', 0);

-- ================================================
-- Java Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1d332', 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 1),
('2d343', 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 2),
('3f43d', 'Java Quiz', 'Test your knowledge of Java.', 25, 'Programming', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1d332-ASDFG', '1d332', 'Which keyword is used to define a class in Java?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '1-1d332-ASDFG', 'class', 1),
('ASDFG-YUIOP', '1-1d332-ASDFG', 'struct', 0),
('ASDFG-ZXCVB', '1-1d332-ASDFG', 'define', 0),
('ASDFG-HGFDS', '1-1d332-ASDFG', 'object', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2d343-QWERT', '2d343', 'What does JVM stand for in Java?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ZXCVB', '2-2d343-QWERT', 'Java Virtual Machine', 1),
('QWERT-ASDFG', '2-2d343-QWERT', 'Java Visual Machine', 0),
('QWERT-POIUY', '2-2d343-QWERT', 'Java Variable Method', 0),
('QWERT-HGFDS', '2-2d343-QWERT', 'Java Value Memory', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3f43d-POIUY', '3f43d', 'Which of the following is used for inheritance in Java?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('POIUY-QWERT', '3-3f43d-POIUY', 'extends', 1),
('POIUY-ASDFG', '3-3f43d-POIUY', 'implements', 0),
('POIUY-ZXCVB', '3-3f43d-POIUY', 'super', 0),
('POIUY-HGFDS', '3-3f43d-POIUY', 'new', 0);

-- ================================================
-- Python Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1f3sf', 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 1),
('2f4sd', 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 2),
('3k5h5', 'Python Quiz', 'Test your knowledge of Python.', 25, 'Programming', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1f3sf-QWERT', '1f3sf', 'What is the correct file extension for Python files?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '1-1f3sf-QWERT', '.py', 1),
('QWERT-ZXCVB', '1-1f3sf-QWERT', '.python', 0),
('QWERT-POIUY', '1-1f3sf-QWERT', '.pt', 0),
('QWERT-LKJHG', '1-1f3sf-QWERT', '.p', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2f4sd-QWERT', '2f4sd', 'What is the correct way to define a function in Python?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-2f4sd-QWERT', 'def function_name():', 1),
('QWERT-ZXCVB', '2-2f4sd-QWERT', 'function function_name():', 0),
('QWERT-POIUY', '2-2f4sd-QWERT', 'function_name = function():', 0),
('QWERT-LKJHG', '2-2f4sd-QWERT', 'def: function_name()', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3k5h5-QWERT', '3k5h5', 'Which operator is used for exponentiation in Python?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '3-3k5h5-QWERT', '**', 1),
('QWERT-ZXCVB', '3-3k5h5-QWERT', '^', 0),
('QWERT-POIUY', '3-3k5h5-QWERT', 'exp()', 0),
('QWERT-LKJHG', '3-3k5h5-QWERT', 'pow()', 0);

-- ================================================
-- React Quiz
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1fs3f', 'React Quiz', 'Test your knowledge of React.', 25, 'Web Development', 1),
('2f4xg', 'React Quiz', 'Test your knowledge of React.', 25, 'Web Development', 2);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1fs3f-ZXCVB', '1fs3f', 'What is JSX in React?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ZXCVB-QWERT', '1-1fs3f-ZXCVB', 'A syntax extension for JavaScript', 1),
('ZXCVB-YUIOP', '1-1fs3f-ZXCVB', 'A templating language', 0),
('ZXCVB-ASDFG', '1-1fs3f-ZXCVB', 'A database', 0),
('ZXCVB-HGFDS', '1-1fs3f-ZXCVB', 'A CSS framework', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2f4xg-ASDFG', '2f4xg', 'Which React hook is used to manage state in functional components?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '2-2f4xg-ASDFG', 'useState', 1),
('ASDFG-ZXCVB', '2-2f4xg-ASDFG', 'useEffect', 0),
('ASDFG-POIUY', '2-2f4xg-ASDFG', 'useContext', 0),
('ASDFG-HGFDS', '2-2f4xg-ASDFG', 'useReducer', 0);


-- ================================================
-- Angular Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1f3sl', 'Angular Quiz', 'Test your knowledge of Angular.', 25, 'Web Development', 1),
('2k98g', 'Angular Quiz', 'Test your knowledge of Angular.', 25, 'Web Development', 2),
('3g8nd', 'Angular Quiz', 'Test your knowledge of Angular.', 25, 'Web Development', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1f3sl-ZXCVB', '1f3sl', 'What is Angular?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ZXCVB-QWERT', '1-1f3sl-ZXCVB', 'A JavaScript framework', 1),
('ZXCVB-YUIOP', '1-1f3sl-ZXCVB', 'A CSS framework', 0),
('ZXCVB-ASDFG', '1-1f3sl-ZXCVB', 'A templating engine', 0),
('ZXCVB-HGFDS', '1-1f3sl-ZXCVB', 'A database', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2k98g-QWERT', '2k98g', 'Which of the following is used to define a module in Angular?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-2k98g-QWERT', '@NgModule', 1),
('QWERT-ZXCVB', '2-2k98g-QWERT', '@Component', 0),
('QWERT-POIUY', '2-2k98g-QWERT', '@Injectable', 0),
('QWERT-LKJHG', '2-2k98g-QWERT', '@Directive', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3g8nd-ASDFG', '3g8nd', 'Which of the following is used for routing in Angular?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '3-3g8nd-ASDFG', 'RouterModule', 1),
('ASDFG-ZXCVB', '3-3g8nd-ASDFG', 'HttpClientModule', 0),
('ASDFG-POIUY', '3-3g8nd-ASDFG', 'FormsModule', 0),
('ASDFG-LKJHG', '3-3g8nd-ASDFG', 'BrowserModule', 0);

-- ================================================
-- Vue Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1g7fh', 'Vue Quiz', 'Test your knowledge of Vue.', 25, 'Web Development', 1),
('2g4bd', 'Vue Quiz', 'Test your knowledge of Vue.', 25, 'Web Development', 2),
('3nd56', 'Vue Quiz', 'Test your knowledge of Vue.', 25, 'Web Development', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1g7fh-ZXCVB', '1g7fh', 'What is Vue.js?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ZXCVB-QWERT', '1-1g7fh-ZXCVB', 'A JavaScript framework', 1),
('ZXCVB-YUIOP', '1-1g7fh-ZXCVB', 'A CSS framework', 0),
('ZXCVB-ASDFG', '1-1g7fh-ZXCVB', 'A templating engine', 0),
('ZXCVB-HGFDS', '1-1g7fh-ZXCVB', 'A database', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-3nd56-QWERT', '3nd56', 'Which of the following is used to define a component in Vue.js?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-3nd56-QWERT', 'Vue.component()', 1),
('QWERT-ZXCVB', '2-3nd56-QWERT', '@Component()', 0),
('QWERT-POIUY', '2-3nd56-QWERT', 'NgComponent()', 0),
('QWERT-LKJHG', '2-3nd56-QWERT', 'React.Component()', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3nd56-ASDFG', '3nd56', 'What is Vuex used for in Vue.js?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '3-3nd56-ASDFG', 'State management', 1),
('ASDFG-ZXCVB', '3-3nd56-ASDFG', 'Routing', 0),
('ASDFG-POIUY', '3-3nd56-ASDFG', 'Component lifecycle management', 0),
('ASDFG-LKJHG', '3-3nd56-ASDFG', 'Template rendering', 0);

-- ================================================
-- Philosophy Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1n5d4', 'Philosophy Quiz', 'Test your knowledge of Philosophy.', 25, 'Humanities', 1),
('2v5oi', 'Philosophy Quiz', 'Test your knowledge of Philosophy.', 25, 'Humanities', 2),
('3v5ug', 'Philosophy Quiz', 'Test your knowledge of Philosophy.', 25, 'Humanities', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1n5d4-QWERT', '1n5d4', 'What is the Socratic method?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '1-1n5d4-QWERT', 'A method of asking questions to stimulate critical thinking', 1),
('QWERT-ZXCVB', '1-1n5d4-QWERT', 'A method of passive learning', 0),
('QWERT-POIUY', '1-1n5d4-QWERT', 'A method of teaching by memorization', 0),
('QWERT-LKJHG', '1-1n5d4-QWERT', 'A method of reading philosophical texts aloud', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2v5oi-QWERT', '2v5oi', 'Who is considered the father of modern philosophy?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-2v5oi-QWERT', 'René Descartes', 1),
('QWERT-ZXCVB', '2-2v5oi-QWERT', 'John Locke', 0),
('QWERT-POIUY', '2-2v5oi-QWERT', 'Socrates', 0),
('QWERT-LKJHG', '2-2v5oi-QWERT', 'Immanuel Kant', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3v5ug-ASDFG', '3v5ug', 'What is the philosophical concept of utilitarianism?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '3-3v5ug-ASDFG', 'The greatest happiness for the greatest number', 1),
('ASDFG-ZXCVB', '3-3v5ug-ASDFG', 'A focus on individual rights', 0),
('ASDFG-POIUY', '3-3v5ug-ASDFG', 'A belief in the power of reason above emotion', 0),
('ASDFG-LKJHG', '3-3v5ug-ASDFG', 'A philosophy of absolute moral duties', 0);

-- ================================================
-- Psychology Quiz
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1bh5d', 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 1),
('2f6kd', 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 2),
('3cvb4', 'Psychology Quiz', 'Test your knowledge of Psychology.', 25, 'Humanities', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1bh5d-QWERT', '1bh5d', 'What is the primary focus of cognitive psychology?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '1-1bh5d-QWERT', 'Mental processes like memory, perception, and problem-solving', 1),
('QWERT-ZXCVB', '1-1bh5d-QWERT', 'Human behavior in response to stimuli', 0),
('QWERT-POIUY', '1-1bh5d-QWERT', 'Unconscious mind and dream analysis', 0),
('QWERT-LKJHG', '1-1bh5d-QWERT', 'Behavioral responses to reinforcement', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2f6kd-QWERT', '2f6kd', 'True or False: Sigmund Freud is considered the founder of cognitive psychology.', 'true_false');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-2f6kd-QWERT', 'False', 1);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3cvb4-ASDFG', '3cvb4', 'Which theory is associated with Jean Piaget?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '3-3cvb4-ASDFG', 'Stages of cognitive development', 1),
('ASDFG-ZXCVB', '3-3cvb4-ASDFG', 'Theory of behaviorism', 0),
('ASDFG-POIUY', '3-3cvb4-ASDFG', 'Theory of classical conditioning', 0),
('ASDFG-LKJHG', '3-3cvb4-ASDFG', 'Theory of operant conditioning', 0);

-- ================================================
-- Design Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1vs43', 'Design Quiz', 'Test your knowledge of Design.', 25, 'Web Development', 1),
('2m6f2', 'Design Quiz', 'Test your knowledge of Design.', 25, 'Web Development', 2),
('3bf4s', 'Design Quiz', 'Test your knowledge of Design.', 25, 'Web Development', 3);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1vs43-ASDFG', '1vs43', 'What is the principle of contrast in design?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '1-1vs43-ASDFG', 'Making elements stand out by using different colors, sizes, or shapes', 1),
('ASDFG-ZXCVB', '1-1vs43-ASDFG', 'Keeping elements uniform in color and size for consistency', 0),
('ASDFG-POIUY', '1-1vs43-ASDFG', 'Minimizing the use of different colors', 0),
('ASDFG-LKJHG', '1-1vs43-ASDFG', 'Focusing on one color scheme throughout the design', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2m6f2-QWERT', '2m6f2', 'What is the rule of thirds in design?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('QWERT-ASDFG', '2-2m6f2-QWERT', 'Dividing the design into three equal parts to create balance', 1),
('QWERT-ZXCVB', '2-2m6f2-QWERT', 'Using symmetrical elements to create balance', 0),
('QWERT-POIUY', '2-2m6f2-QWERT', 'Placing the main subject in the center of the design', 0),
('QWERT-LKJHG', '2-2m6f2-QWERT', 'Avoiding any negative space in the design', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3bf4s-ASDFG', '3bf4s', 'What does "white space" refer to in design?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '3-3bf4s-ASDFG', 'Empty space that helps improve readability and focus', 1),
('ASDFG-ZXCVB', '3-3bf4s-ASDFG', 'Areas that are filled with color or images', 0),
('ASDFG-POIUY', '3-3bf4s-ASDFG', 'Space between objects to create a busy and dynamic feel', 0),
('ASDFG-LKJHG', '3-3bf4s-ASDFG', 'Decorative elements added to the design', 0);

-- ================================================
-- Security Quiz 
-- ================================================

-- Insert quizzes with random 5-character IDs
INSERT INTO quizzes (quiz_id, name, description, total_questions, category, level) VALUES
('1v4d3', 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 1),
('2vxgv', 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 2),
('3fr65', 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 3),
('4bv8v', 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 4),
('5bd4g', 'Security Quiz', 'Test your knowledge of Security.', 25, 'Web Development', 5);

-- Level 1 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('1-1v4d3-LKJHG', '1v4d3', 'What is a common vulnerability in a web application?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('LKJHG-QWERT', '1-1v4d3-LKJHG', 'SQL injection', 1),
('LKJHG-YUIOP', '1-1v4d3-LKJHG', 'Cross-Site Scripting (XSS)', 0),
('LKJHG-ASDFG', '1-1v4d3-LKJHG', 'Insecure Direct Object References (IDOR)', 0),
('LKJHG-ZXCVB', '1-1v4d3-LKJHG', 'Buffer overflow', 0);

-- Level 2 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('2-2vxgv-ASDFG', '2vxgv', 'Which of the following is a potential security risk associated with SQL injection?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '2-2vxgv-ASDFG', 'Input validation', 1),
('ASDFG-ZXCVB', '2-2vxgv-ASDFG', 'Data encryption', 0),
('ASDFG-POIUY', '2-2vxgv-ASDFG', 'Cross-site scripting (XSS)', 0),
('ASDFG-HGFDS', '2-2vxgv-ASDFG', 'SQL injection', 0);

-- Level 3 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('3-3fr65-ZXCVB', '3fr65', 'Which of the following is a common way to prevent SQL injection?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ZXCVB-QWERT', '3-3fr65-ZXCVB', 'Prepared statements', 1),
('ZXCVB-YUIOP', '3-3fr65-ZXCVB', 'Input validation', 0),
('ZXCVB-ASDFG', '3-3fr65-ZXCVB', 'Escaping special characters', 0),
('ZXCVB-HGFDS', '3-3fr65-ZXCVB', 'Regular expressions', 0);

-- Level 4 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('4-4bv8v-LKJHG', '4bv8v', 'Which of the following is a method used to sanitize user input to prevent SQL injection?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('LKJHG-QWERT', '4-4bv8v-LKJHG', 'Prepared statements', 0),
('LKJHG-ZXCVB', '4-4bv8v-LKJHG', 'Escaping special characters', 1),
('LKJHG-POIUY', '4-4bv8v-LKJHG', 'Regular expressions', 0),
('LKJHG-HGFDS', '4-4bv8v-LKJHG', 'Input validation', 0);

-- Level 5 Questions and Answers
INSERT INTO questions (question_id, quiz_id, content, question_type) VALUES
('5-5bd4g-ASDFG', '5bd4g', 'Which of the following is a technique used to detect and prevent SQL injection?', 'multiple_choice');

INSERT INTO answers (answer_id, question_id, content, is_correct) VALUES
('ASDFG-QWERT', '5-5bd4g-ASDFG', 'Input validation', 0),
('ASDFG-ZXCVB', '5-5bd4g-ASDFG', 'SQL injection detection', 1),
('ASDFG-POIUY', '5-5bd4g-ASDFG', 'Regular expressions', 0),
('ASDFG-HGFDS', '5-5bd4g-ASDFG', 'Escaping special characters', 0);

