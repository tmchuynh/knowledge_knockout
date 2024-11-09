


export interface User {
    user_id: string;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface Progress {
    progress_id: string;
    user_id: string;
    quiz_id: string;
    question_id: string;
    score_id: string;
    level: number;
    total_questions: number;
    date_completed: Date;

}
export interface Score {
    score_id: string;
    user_id: string;
    quiz_id: string;
    level: number;
    score: number;
    total_questions: number;
    quiz_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface LeaderboardEntry {
    username: string;
    quiz: string;
    level: number;
    score: number;
    date_completed: Date;
}

export interface Answer {
    answer_id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
}

export interface Question {
    answers: Answer[];
    question_id: number;
    quiz_id: string;
    content: string;
    question_type: "multiple_choice" | "true_false" | "written";
}

export interface Quiz {
    quiz_id: string;
    name: string;
    description: string;
    total_questions: number;
    category: string;
    level: number[];
}

