import { DataTypes, Model, CreationOptional, InferCreationAttributes, InferAttributes } from 'sequelize';
import sequelize from '@/backend/config/db';
import User from './User';

class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare id: string;
    declare compound_id: string;
    declare user_id: string;
    declare provider_type: string;
    declare provider_id: string;
    declare provider_account_id: string;
    declare refresh_token: string;
    declare access_token: string;
    declare access_token_expires: Date;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
Account.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        compound_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        provider_type: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        provider_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        provider_account_id: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        access_token_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['compound_id'],
            },
            {
                fields: ['provider_account_id'],
            },
            {
                fields: ['provider_id'],
            },
            {
                fields: ['user_id'],
            },
        ],
    }
);

export default Account;