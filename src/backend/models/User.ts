import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcrypt';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare user_id: string;
    declare firstName: string;
    declare lastName: string;
    declare username: string;
    declare password: string;
    declare email: string;
    declare provider: string | null;
    declare providerId: string | null;
    declare reset_password_token: string | null;
    declare reset_password_expires: Date | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        user_id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
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
        provider: {
            type: DataTypes.STRING( 50 ),
            allowNull: true,
        },
        providerId: {
            type: DataTypes.STRING( 250 ),
            allowNull: true,
        },
        reset_password_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reset_password_token: {
            type: DataTypes.STRING( 250 ),
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

User.beforeCreate( async ( user ) => {
    if ( user.password ) {
        const hashedPassword = await bcrypt.hash( user.password, 10 );
        user.password = hashedPassword;
    }
} );

User.beforeUpdate( async ( user ) => {
    if ( user.changed( 'password' ) ) {
        const hashedPassword = await bcrypt.hash( user.password, 10 );
        user.password = hashedPassword;
    }
} );

export default User;
