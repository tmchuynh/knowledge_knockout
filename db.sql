-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS knowledge_knockout_db;

-- Use the newly created database
USE knowledge_knockout_db;

-- Drop existing tables
DROP TABLE IF EXISTS progress;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL UNIQUE,
    image VARCHAR(255),
    password VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id CHAR(36) NOT NULL PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    total_questions INT NOT NULL DEFAULT 1,
    category VARCHAR(100) NOT NULL,
    level INT NOT NULL DEFAULT 1
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id CHAR(36) NOT NULL PRIMARY KEY,  
    quiz_id CHAR(36) NOT NULL,  
    content TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'written') NOT NULL DEFAULT 'multiple_choice',
    FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
    id CHAR(36) NOT NULL PRIMARY KEY,  
    question_id CHAR(36) NOT NULL,  
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
    id CHAR(36) NOT NULL PRIMARY KEY,  
    user_id CHAR(36) NOT NULL,  
    quiz_id CHAR(36) NOT NULL,  
    level INT NOT NULL DEFAULT 1,
    score INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL,
    quiz_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
    id CHAR(36) NOT NULL PRIMARY KEY,  
    question_id CHAR(36) DEFAULT NULL,  
    score_id CHAR(36) DEFAULT NULL,  
    level INT NOT NULL DEFAULT 1,
    total_questions INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (score_id) REFERENCES scores (id) ON DELETE CASCADE
);
