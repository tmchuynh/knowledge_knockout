import { DataTypes, Model, CreationOptional, InferCreationAttributes, InferAttributes } from 'sequelize';
import sequelize from '@/backend/config/db';
import User from './User';

class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    declare id: string;
    declare user_id: string;
    declare expires: Date;
    declare session_token: string;
    declare access_token: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Session.init(
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
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        session_token: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
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
        modelName: 'Session',
        tableName: 'sessions',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true,
                fields: ['session_token'],
            },
            {
                unique: true,
                fields: ['access_token'],
            },
        ],
    }
);