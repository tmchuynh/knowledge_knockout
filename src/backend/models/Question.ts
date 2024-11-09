import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import { Quiz } from '.';

class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
    declare question_id: string;
    declare quiz_id: string;
    declare content: string;
    declare question_type: 'multiple_choice' | 'true_false' | 'written';
}

Question.init(
    {
        question_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        quiz_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Quiz,
                key: 'quiz_id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        question_type: {
            type: DataTypes.ENUM( 'multiple_choice', 'true_false', 'written' ),
            allowNull: false,
            defaultValue: 'multiple_choice',
        }
    },
    {
        sequelize,
        modelName: 'Question',
        tableName: 'questions',
        timestamps: true,
    }
);

export default Question;
