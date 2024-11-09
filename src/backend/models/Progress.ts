import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import { Question, Quiz, Score, User } from '.';

class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>> {
    declare progress_id: string;
    declare user_id: string;
    declare quiz_id: string;
    declare question_id: string;
    declare score_id: string | null;
    declare level: number;
    declare total_questions: number;
    declare completed: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Progress.init(
    {
        progress_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        quiz_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Quiz,
                key: 'quiz_id',
            },
        },
        question_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Question,
                key: 'question_id',
            },
        },
        score_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: true,
            references: {
                model: Score,
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
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        modelName: 'Progress',
        tableName: 'progress',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Progress;
