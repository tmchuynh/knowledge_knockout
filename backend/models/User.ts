import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcryptjs';

// Define User attributes
export interface UserAttributes {
    id?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    username: string;
    password: string;
    image?: string;
    phone_number?: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}

// Define the type for creation (id is optional)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// Extend Model class with attributes and creation attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public first_name!: string;
    public last_name!: string;
    public username!: string;
    public image!: string;
    public password!: string;
    public phone_number!: string;
    public email!: string;
    public created_at!: Date;
    public updated_at!: Date;
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
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING( 250 ),
            allowNull: true,
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
            },
        ],
    }
);

// Hash the password before creating or updating the user
User.beforeCreate( async ( user ) => {
    if ( user.password ) {
        user.password = await bcrypt.hash( user.password, 10 );
    }
} );

User.beforeUpdate( async ( user ) => {
    if ( user.changed( 'password' ) ) {
        user.password = await bcrypt.hash( user.password, 10 );
    }
} );

export default User;
