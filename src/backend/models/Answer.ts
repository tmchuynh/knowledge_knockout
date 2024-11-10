import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import { Question } from '.';

class Answer extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
    declare id: string;
    declare question_id: string;
    declare content: string;
    declare is_correct: boolean;
}

Answer.init(
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
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: 'Answer',
        tableName: 'answers',
        timestamps: true,
    }
);

export default Answer;
