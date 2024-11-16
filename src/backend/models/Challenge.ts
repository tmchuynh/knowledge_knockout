import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Challenge extends Model {
    public id?: string;
    public title!: string;
    public description?: string;
    public type!: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'bi-monthly' | 'yearly';
    public date!: Date;
    public created_at?: Date;
    public updated_at?: Date;
}
Challenge.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM( 'daily', 'weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'yearly' ),
            allowNull: false,
            defaultValue: 'monthly',
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        modelName: 'Challenge',
        tableName: 'challenges',
        timestamps: false,
    }
);
export default Challenge;
