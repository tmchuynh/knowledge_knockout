import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Question, Score, User } from '.';

interface ProgressAttributes {
    id?: string;
    user_id: string;
    question_id: string;
    score_id: string;
    level: number;
    total_questions: number;
    completed: boolean;
    created_at?: Date;
    updated_at?: Date;
}
interface ProgressCreationAttributes extends Optional<ProgressAttributes, 'id'> { }

class Progress extends Model<ProgressAttributes, ProgressCreationAttributes> implements ProgressAttributes {
    public id!: string;
    public user_id!: string;
    public question_id!: string;
    public score_id!: string;
    public level!: number;
    public total_questions!: number;
    public completed!: boolean;
    public created_at?: Date;
    public updated_at?: Date;
}


Progress.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        question_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Question,
                key: 'id',
            },
        },
        score_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: true,
            references: {
                model: Score,
                key: 'id',
            },
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Progress',
        tableName: 'progress',
        timestamps: false,
    }
);

export default Progress;
