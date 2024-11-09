import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare user_id: string;
    declare username: string;
    declare password: string;
    declare email: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        user_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            unique: true,
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default User;
