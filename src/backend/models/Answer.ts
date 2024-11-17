import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Question } from '.';


class Answer extends Model {
    public id?: string;
    public question_id!: string;
    public content!: string;
    public is_correct!: boolean;
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
                key: 'id',
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
        timestamps: false,
    }
);

export default Answer;
