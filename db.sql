-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS knowledge_knockout_db;

-- Use the newly created database
USE knowledge_knockout_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(250) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id VARCHAR(250) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    total_questions INT NOT NULL DEFAULT 1,
    category VARCHAR(100) NOT NULL,
    level INT NOT NULL DEFAULT 1
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    question_id VARCHAR(250) NOT NULL PRIMARY KEY,
    quiz_id VARCHAR(250) NOT NULL,
    content TEXT NOT NULL,
    question_type ENUM(
        'multiple_choice',
        'true_false',
        'written'
    ) NOT NULL DEFAULT 'multiple_choice',
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
    answer_id VARCHAR(250) NOT NULL PRIMARY KEY,
    question_id VARCHAR(250) NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
    score_id VARCHAR(250) NOT NULL PRIMARY KEY,
    user_id VARCHAR(250) NOT NULL,
    quiz_id VARCHAR(250) NOT NULL,
    level INT NOT NULL DEFAULT 1,
    score INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL,
    quiz_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
    progress_id VARCHAR(250) NOT NULL PRIMARY KEY,
    user_id VARCHAR(250) NOT NULL,
    quiz_id VARCHAR(250) NOT NULL,
    question_id VARCHAR(250) DEFAULT 0,
    score_id VARCHAR(250) DEFAULT NULL,
    level INT NOT NULL DEFAULT 1,
    total_questions INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE,
    FOREIGN KEY (score_id) REFERENCES scores (score_id) ON DELETE CASCADE
);