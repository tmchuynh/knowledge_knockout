import { sequelize, User } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const users = await User.findAll( {
            attributes: [[sequelize.fn( 'DISTINCT', sequelize.col( 'image' ) ), 'image']],
        } );

        return NextResponse.json( users );
    } catch ( error ) {
        console.error( 'Error fetching users data:', error );
        return NextResponse.json( { error: 'Failed to fetch users data' }, { status: 500 } );
    }
}
