// models/Question.ts

import { DataTypes, Model } from 'sequelize';
import Quiz from './Quiz';
import sequelize from '../config/db';

const Question = sequelize.define(
    'Question',
    {
        question_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes',
                key: 'quiz_id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        question_type: {
            type: DataTypes.ENUM( 'multiple_choice', 'true_false', 'written' ),
            allowNull: false,
            defaultValue: 'multiple_choice',
        },
    },
    {
        tableName: 'questions',
        timestamps: false,
    }
);

// Associations


export default Question;
