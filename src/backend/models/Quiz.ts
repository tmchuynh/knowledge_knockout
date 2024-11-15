import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Quiz extends Model {
    public id?: string;
    public subject!: string;
    public description?: string;
    public total_questions!: number;
    public category!: string;
    public level!: number;
    public created_at!: Date;
    public updated_at?: Date;
}
Quiz.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        subject: {
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
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
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
