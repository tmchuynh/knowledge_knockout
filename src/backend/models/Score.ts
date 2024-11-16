import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Quiz, User } from '.';

class Score extends Model {
    public id?: string;
    public quiz_id!: string;
    public username!: string;
    public score!: number;
    public timelapsed!: typeof DataTypes.TIME;
    public created_at?: Date;
    public updated_at?: Date;
}

Score.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id',
            },
        },
        username: {
            type: DataTypes.STRING( 100 ),
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
            defaultValue: "00:00:00",
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
