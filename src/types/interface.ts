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

export interface Score {
    quiz?: Quiz;
    id?: string;
    username: string;
    quiz_id: string;
    score: number;
    quiz_date: Date;
    created_at?: Date;
    updated_at?: Date;
}

export interface LeaderboardEntry {
    username: string;
    quiz: string;
    level: number;
    score: number;
    date_completed: Date;
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
