import { NextResponse } from 'next/server';
import { processUser } from '../../../../backend/controllers/userController';

export async function GET( req: Request, props: { params: Promise<{ id: string; }>; } ) {
    const params = await props.params;
    const userId = params.id;

    try {
        const user = processUser( userId );
        return NextResponse.json( user );
    }
    catch ( error ) {
        NextResponse.json( { error: 'User not found' }, { status: 404 } );
        return NextResponse.json( "" );
    }
}
