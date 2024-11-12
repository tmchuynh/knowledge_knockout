import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import { Question, Score } from '.';

class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>> {
    declare id: string;
    declare question_id: string;
    declare score_id: string | null;
    declare level: number;
    declare total_questions: number;
    declare completed: boolean;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Progress.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        question_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Question,
                key: 'id',
            },
        },
        score_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: true,
            references: {
                model: Score,
                key: 'id',
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
        sequelize,
        modelName: 'Progress',
        tableName: 'progress',
        timestamps: true,
    }
);

export default Progress;
