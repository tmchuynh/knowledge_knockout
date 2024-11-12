import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Question } from '.';


interface AnswerAttributes {
    id?: string;
    question_id: string;
    content: string;
    is_correct: boolean;

}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> { }


class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
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
