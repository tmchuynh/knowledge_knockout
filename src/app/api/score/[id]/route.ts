import { NextResponse } from 'next/server';
import { Score, Quiz } from '@/backend/models';

export async function GET( request: Request, { params }: { params: { id: string; }; } ) {
    try {
        const { id } = params;

        if ( !id ) {
            return NextResponse.json( { error: 'ID is required' }, { status: 400 } );
        }

        // Fetch scores with associated Quiz data
        const scores = await Score.findAll( {
            where: { user_id: id },
            include: [{ model: Quiz, as: 'quiz' }]
        } );

        if ( !scores || scores.length === 0 ) {
            return NextResponse.json( { error: 'No scores found for this user' }, { status: 404 } );
        }

        return NextResponse.json( scores, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'Failed to fetch scores' }, { status: 500 } );
    }
}
