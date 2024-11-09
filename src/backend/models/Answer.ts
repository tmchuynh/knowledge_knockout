// models/Answer.ts

import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Answer = sequelize.define(
    'Answer',
    {
        answer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'question_id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'answers',
        timestamps: false,
    }
);

// Associations


export default Answer;
