// models/Progress.ts

import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Progress = sequelize.define(
    'Progress',
    {
        progress_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes',
                key: 'quiz_id',
            },
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'question_id',
            },
        },
        score_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'scores',
                key: 'score_id',
            },
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_completed: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'progress',
        timestamps: false,
    }
);


export default Progress;
