import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Question, User } from '.';

class Progress extends Model {
    public id?: string;
    public user_id!: string;
    public quiz_id!: string;
    public question_id!: string;
    public total_questions!: number;
    public completed!: boolean;
    public created_at!: Date;
    public updated_at!: Date;
}

Progress.init(
    {
        id: {
            type: DataTypes.STRING( 255 ),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        quiz_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            references: {
                model: Question,
                key: 'id',
            },
        },
        question_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            references: {
                model: Question,
                key: 'id',
            },
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Progress',
        tableName: 'progress',
        timestamps: false,
    }
);

export default Progress;
