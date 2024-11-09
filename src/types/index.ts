


export interface User {
    user_id: string;
    created_at: Date;
}

export interface ProgressItem {
    quizId: string;
    current_question_index: number;
    score: number;
    quiz_id: string;
    level: number;
}
export interface Score {
    quiz_date: Date;
    user_id: string;
    quiz_id: string;
    quiz: string;
    level: number;
    score: number;
    total_questions: number;
}

export interface LeaderboardEntry {
    user_id: string;
    score: number;
    date: Date;
    level: number;
}

export interface Answer {
    answer_id: number;
    question_id: number;
    answer_text: string;
    is_correct: boolean;
}

export interface Question {
    answers: Answer[];
    question_id: number;
    quiz_id: string;
    question_type: string;
    level: number;
    question_text: string;
}

// Define an export interface for the quiz data structure
export interface QuizData {
    chemistryQuizData: Question[];
    physicsQuizData: Question[];
    biologyQuizData: Question[];
    mathQuizData: Question[];
    englishQuizData: Question[];
    historyQuizData: Question[];
    geographyQuizData: Question[];
    computerScienceQuizData: Question[];
    literatureQuizData: Question[];
    philosophyQuizData: Question[];
    socialStudiesQuizData: Question[];
    politicsQuizData: Question[];
    economicsQuizData: Question[];
    psychologyQuizData: Question[];
    artQuizData: Question[];
    musicQuizData: Question[];
    sportsQuizData: Question[];
    engineeringQuizData: Question[];
    realEstateQuizData: Question[];
    healthCareQuizData: Question[];
    astrologyQuizData: Question[];
    animalQuizData: Question[];
    financeQuizData: Question[];
}

export interface QuizItem {
    id: string;
    data: Quiz;
}

export interface Quiz {
    quiz_id: string;
    title: string;
    description: string;
    level: number[];
    created_at: Date;
}

export interface QuizOption {
    id: string;
    label: string;
    category: string;
}

export interface Score {
    score_id: number;
    user_id: string;
    quiz_id: string;
    level: number;
    score: number;
    total_questions: number;
    quiz_date: Date;
}