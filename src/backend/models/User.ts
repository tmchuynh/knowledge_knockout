import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcrypt';

class User extends Model {
    public id!: string;
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
            unique: true,
            allowNull: false,
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
    try {
        if ( user.password ) {
            user.password = await bcrypt.hash( user.password, 10 );
        }
    } catch ( error ) {
        throw new Error( 'Password hashing failed' );
    }
} );

User.beforeUpdate( async ( user ) => {
    try {
        if ( user.changed( 'password' ) ) {
            user.password = await bcrypt.hash( user.password, 10 );
        }
    } catch ( error ) {
        throw new Error( 'Password hashing failed' );
    }
} );

export default User;
