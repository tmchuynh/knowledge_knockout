import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcryptjs';

class User extends Model {
    declare id?: string;
    declare name?: string;
    declare first_name?: string;
    declare last_name?: string;
    declare username: string;
    declare password: string;
    declare phone_number: string;
    declare email: string;
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
            type: DataTypes.STRING( 250 ),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING( 250 ),
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
        phone_number: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING( 250 ),
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
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
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
