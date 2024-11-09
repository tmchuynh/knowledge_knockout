// models/Progress.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';
import Quiz from './Quiz';

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
        current_question_index: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        date_completed: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'user_quiz_progress',
        timestamps: false,
    }
);

// Associations
Progress.belongsTo( User, { foreignKey: 'user_id', onDelete: 'CASCADE' } );
User.hasMany( Progress, { foreignKey: 'user_id', onDelete: 'CASCADE' } );

Progress.belongsTo( Quiz, { foreignKey: 'quiz_id', targetKey: 'quiz_id', onDelete: 'CASCADE' } );
Quiz.hasMany( Progress, { foreignKey: 'quiz_id', sourceKey: 'quiz_id', onDelete: 'CASCADE' } );


export default Progress;
