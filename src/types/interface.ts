export interface User {
    id: string;
    full_name?: string;
    username: string;
    password: string;
    email: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface DecodedToken {
    id: string;
    [key: string]: any;
}

export interface Challenge {
    id: string;
    date: Date;
    title: string;
    description: string;
    type: "daily" | "weekly" | "bi-weekly" | "monthly" | "bi-monthly" | "yearly";
}

export interface Score {
    quiz?: Quiz;
    id?: string;
    username: string;
    quiz_id: string;
    score: number;
    timelapsed: string;
    completed: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface LeaderboardEntry {
    quiz_subject: string;
    quiz_id: string;
    username: string;
    level: number;
    score: number;
    timelapsed: string;
    date: Date;
}

export interface Answer {
    id: string;
    question_id: number;
    content: string;
    is_correct: boolean;
}

export interface Question {
    answers: Answer[];
    id: string;
    quiz_id: string;
    content: string;
    question_type: "multiple_choice" | "true_false" | "written";
}

export interface Quiz {
    id: string;
    subject: string;
    description: string;
    total_questions: number;
    category: string;
    level: number;
    created_at?: Date;
    updated_at?: Date;
}
