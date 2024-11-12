import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface QuizAttributes {
    id?: string;
    name: string;
    description: string;
    total_questions: number;
    category: string;
    level: number[];
}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> { }

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public total_questions!: number;
    public category!: string;
    public level!: number[];
}

Quiz.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        category: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    },
    {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizzes',
        timestamps: false,
    }
);

export default Quiz;
