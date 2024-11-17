import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Quiz, User } from '.';

class Score extends Model {
    public id?: string;
    public quiz_id!: string;
    public username!: string;
    public score!: number;
    public timelapsed!: string;
    public completed!: boolean;
    public created_at?: Date;
    public updated_at?: Date;


}

Score.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id',
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'username',
            },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        timelapsed: {
            type: DataTypes.TIME,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
