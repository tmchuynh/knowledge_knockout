-- Use the newly created database
USE knowledge_knockout_db;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS verification_requests;

CREATE TABLE IF NOT EXISTS accounts (
    id CHAR(36) NOT NULL PRIMARY KEY,
    compound_id VARCHAR(255) NOT NULL,
    userId CHAR(36) NOT NULL UNIQUE,
    provider_type VARCHAR(255) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    access_token_expires TIMESTAMP(6),
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
    id CHAR(36) NOT NULL PRIMARY KEY,
    userId CHAR(36) NOT NULL UNIQUE,
    expires TIMESTAMP(6) NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification_requests (
    id CHAR(36) NOT NULL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires TIMESTAMP(6) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE UNIQUE INDEX compound_id ON accounts (compound_id);

CREATE INDEX provider_account_id ON accounts (provider_account_id);

CREATE INDEX provider_id ON accounts (provider_id);

CREATE UNIQUE INDEX session_token ON sessions (session_token);

CREATE UNIQUE INDEX access_token ON sessions (access_token);
