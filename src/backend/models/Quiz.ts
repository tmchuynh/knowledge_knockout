import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

class Quiz extends Model<InferAttributes<Quiz>, InferCreationAttributes<Quiz>> {
    declare id: string;
    declare name: string;
    declare description: string | null;
    declare total_questions: number;
    declare category: string;
    declare level: number;
}

Quiz.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
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
        timestamps: true,
    }
);

export default Quiz;
