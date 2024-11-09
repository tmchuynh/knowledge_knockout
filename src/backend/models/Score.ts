import { DataTypes, Model } from 'sequelize';
import User from './User';
import sequelize from '../config/db';
import Quiz from './Quiz';

const Score = sequelize.define(
    'Score',
    {
        score_id: {
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
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes',
                key: 'level',
            },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quiz_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'scores',
        timestamps: false,
    }
);

// Associations

export default Score;
