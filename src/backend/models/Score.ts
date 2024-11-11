import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import { Quiz, User } from '.';

class Score extends Model<InferAttributes<Score>, InferCreationAttributes<Score>> {
    declare score_id: string;
    declare user_id: string;
    declare quiz_id: string;
    declare level: number;
    declare score: number;
    declare total_questions: number;
    declare quiz_date: Date;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Score.init(
    {
        score_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        quiz_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id',
            },
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Score',
        tableName: 'scores',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Score;
