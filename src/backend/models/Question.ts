import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Quiz } from '.';

interface QuestionAttributes {
    id?: string;
    quiz_id: string;
    content: string;
    question_type: 'multiple_choice' | 'true_false' | 'written';
}

// Define the type for creation (id is optional)
interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> { }

// Extend Model class with attributes and creation attributes
class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    public id!: string;
    public quiz_id!: string;
    public content!: string;
    public question_type!: 'multiple_choice' | 'true_false' | 'written';

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
            type: DataTypes.ENUM( 'multiple_choice', 'true_false', 'written' ),
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
