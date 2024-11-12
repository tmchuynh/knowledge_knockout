import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Association } from 'sequelize';
import sequelize from '../config/db';
import { Progress, Quiz, User } from '.';

class Score extends Model<InferAttributes<Score>, InferCreationAttributes<Score>> {
    declare id: string;
    declare user_id: string;
    declare quiz_id: string;
    declare level: number;
    declare score: number;
    declare total_questions: number;
    declare quiz_date: Date;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;

    declare user?: User;
    declare quiz?: Quiz;

    public static associations: {
        user: Association<Score, User>;
        quiz: Association<Score, Quiz>;
    };
}

Score.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
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
