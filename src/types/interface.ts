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

export interface Progress {
    id: string;
    user_id: string;
    quiz_id: string;
    question_id: string;
    total_questions: number;
    completed: boolean;
    created_at?: Date;
    updated_at?: Date;

}
export interface Score {
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
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
}

export interface Question {
    answers: Answer[];
    id: number;
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
    level: number[];
    created_at?: Date;
    updated_at?: Date;
}
