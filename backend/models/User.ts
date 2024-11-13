import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcryptjs';

class User extends Model {
    public id?: string;
    public username!: string;
    public full_name!: string;
    public password!: string;
    public email!: string;
    public image?: string;
    public created_at?: Date;
    public updated_at?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.STRING( 255 ),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING( 255 ),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING( 250 ),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        image: {
            type: DataTypes.STRING( 255 ),
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
    }
);

// Hash the password before creating or updating the user
User.beforeCreate( async ( user ) => {
    if ( user.password && isValid( user.password ) ) {
        user.password = await bcrypt.hash( user.password, 10 );
    }
} );

User.beforeUpdate( async ( user ) => {
    if ( user.changed( 'password' ) && isValid( user.password ) ) {
        user.password = await bcrypt.hash( user.password, 10 );
    }
} );

function isValid( value: string ) {
    if ( value.length < 8 ) {
        throw new Error( 'Value must have a minimum of 8 characters!' );
    }
    if ( !/[A-Z]/.test( value ) ) {
        throw new Error( 'Value must contain at least one uppercase letter!' );
    }
    if ( !/\d/.test( value ) ) {
        throw new Error( 'Value must contain at least one number!' );
    }
}

export default User;
