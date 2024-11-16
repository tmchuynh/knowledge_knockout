import { NextRequest, NextResponse } from 'next/server';
import { Quiz } from '@/backend/models';

export async function GET( req: NextRequest, props: { params: { subject: string; }; } ) {


    const { subject } = await props.params;
    try {
        // Validate if `subject` is provided
        if ( !subject ) {
            return NextResponse.json( { error: 'Quiz subject is required' }, { status: 400 } );
        }

        // Find the quiz in the database
        const quiz = await Quiz.findAll( {
            where: { subject }
        } );

        if ( !quiz ) {
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        // Return the quiz data
        return NextResponse.json( quiz, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching quiz:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
