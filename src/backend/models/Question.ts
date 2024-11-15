import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Quiz } from '.';

class Question extends Model {
    public id?: string;
    public quiz_id!: string;
    public content!: string;
    public question_type!: 'multiple_choice' | 'true_false';
}

Question.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        quiz_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        question_type: {
            type: DataTypes.ENUM( 'multiple_choice', 'true_false' ),
            allowNull: false,
            defaultValue: 'multiple_choice',
        }
    },
    {
        sequelize,
        modelName: 'Question',
        tableName: 'questions',
        timestamps: false,
    }
);

export default Question;
