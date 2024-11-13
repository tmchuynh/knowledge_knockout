import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Quiz } from '.';

interface ScoreAttributes {
    id?: string;
    quiz_id: string;
    level: number;
    score: number;
    total_questions: number;
    quiz_date: Date;
    created_at?: Date;
    updated_at?: Date;
}

interface ScoreCreationAttributes extends Optional<ScoreAttributes, 'id'> { }

class Score extends Model<ScoreAttributes, ScoreCreationAttributes> implements ScoreAttributes {
    public id!: string;
    public quiz_id!: string;
    public level!: number;
    public score!: number;
    public total_questions!: number;
    public quiz_date!: Date;
    public created_at?: Date;
    public updated_at?: Date;

}

Score.init(
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
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quiz_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        },
    },
    {
        sequelize,
        modelName: 'Score',
        tableName: 'scores',
        timestamps: false,
    }
);

export default Score;
