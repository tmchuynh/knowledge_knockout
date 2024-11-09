import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const User = sequelize.define(
    'User',
    {
        user_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
            unique: true,
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
        tableName: 'users',
        timestamps: false,
    }
);

export default User;
