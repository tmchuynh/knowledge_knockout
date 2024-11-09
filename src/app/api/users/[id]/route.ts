import { NextResponse } from 'next/server';
import { processUser } from '../../../../backend/controllers/userController';

export async function GET( req: Request, props: { params: { userId: string, first_name: string, last_name: string, username: string, password: string, email: string; }; } ) {

    const { userId, first_name, last_name, username, password, email } = props.params;

    try {
        const user = processUser( userId, first_name, last_name, username, password, email, null, null );
        return NextResponse.json( user );
    }
    catch ( error ) {
        NextResponse.json( { error: 'User not found' }, { status: 404 } );
        return NextResponse.json( "" );
    }
}
