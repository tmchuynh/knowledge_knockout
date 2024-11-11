import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcrypt';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: string;
    declare name?: string;
    declare first_name?: string;
    declare last_name?: string;
    declare username: string;
    declare password: string;
    declare email: string;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.STRING( 250 ),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        last_name: {
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
        indexes: [
            {
                unique: true,
                fields: ['email'],
            },
            {
                unique: true,
                fields: ['username'],
            }
        ]
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
