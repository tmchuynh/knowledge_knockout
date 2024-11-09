import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

const Quiz = sequelize.define(
    'Quiz',
    {
        quiz_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: 'quizzes',
        timestamps: false,
    }
);

export default Quiz;
