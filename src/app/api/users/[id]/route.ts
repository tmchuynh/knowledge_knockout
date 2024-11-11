import { NextResponse } from 'next/server';
import { processUser } from '../../../../backend/controllers/userController';

export async function GET( req: Request, props: { params: { first_name: string, last_name: string, username: string, password: string, email: string, phone_number: string; }; } ) {

    const { first_name, last_name, username, password, phone_number, email } = props.params;

    try {
        const user = processUser( first_name, last_name, username, password, phone_number, email );
        return NextResponse.json( user );
    }
    catch ( error ) {
        NextResponse.json( { error: 'User not found' }, { status: 404 } );
        return NextResponse.json( "" );
    }
}
