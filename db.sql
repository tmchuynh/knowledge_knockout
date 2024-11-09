-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS quizlet;

-- Use the newly created database
USE quizlet;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(250) NOT NULL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    level INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM(
        'multiple_choice',
        'true_false',
        'written'
    ) NOT NULL DEFAULT 'multiple_choice',
    level INT NOT NULL DEFAULT 1,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE
);

-- Create user_quiz_progress table
CREATE TABLE IF NOT EXISTS user_quiz_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(250) NOT NULL,
    quiz_id INT NOT NULL,
    level INT NOT NULL DEFAULT 1,
    current_question_index INT DEFAULT 0,
    score INT NOT NULL DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    date_completed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(250) NOT NULL,
    quiz_id INT NOT NULL,
    level INT NOT NULL DEFAULT 1,
    score INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL,
    quiz_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
);