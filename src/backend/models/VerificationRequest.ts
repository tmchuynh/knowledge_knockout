import { DataTypes, Model, CreationOptional, InferCreationAttributes, InferAttributes } from 'sequelize';
import sequelize from '@/backend/config/db';


class VerificationRequest extends Model<InferAttributes<VerificationRequest>, InferCreationAttributes<VerificationRequest>> {
    declare id: string;
    declare identifier: string;
    declare token: string;
    declare expires: Date;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

VerificationRequest.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        identifier: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING( 255 ),
            allowNull: false,
            unique: true,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
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
        modelName: 'VerificationRequest',
        tableName: 'verification_requests',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true,
                fields: ['token'],
            },
        ],
    }
);