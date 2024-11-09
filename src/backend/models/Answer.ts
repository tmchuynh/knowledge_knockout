// models/Answer.ts

import { DataTypes, Model } from 'sequelize';
import Question from './Question';
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
        answer_text: {
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
Answer.belongsTo( Question, { foreignKey: 'question_id', onDelete: 'CASCADE' } );
Question.hasMany( Answer, { foreignKey: 'question_id', onDelete: 'CASCADE' } );


export default Answer;
