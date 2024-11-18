import { NextRequest, NextResponse } from 'next/server';
import { Score, Quiz } from '@/backend/models';
import { formatTimelapsed } from '@/utils/formatUtils';

export async function GET( req: NextRequest, { params }: { params: { id: string; }; } ) {
    try {
        const { id } = await params;

        // Fetch the score by id from the database
        const score = await Score.findOne( {
            where: { id },
        } );

        console.log( "SCORE", score );

        if ( !score ) {
            return NextResponse.json( { message: 'Score not found' }, { status: 404 } );
        }

        return NextResponse.json( score, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching score:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}

export async function PUT( req: NextRequest, { params }: { params: { id: string; }; } ) {
    try {
        const { id } = await params;
        const body = await req.json();

        console.log( "BODY", body );

        // Ensure that at least one updatable field is provided
        if (
            ( !body.timelapsed && body.timelapsed !== 0 ) &&
            ( !body.score && body.score !== 0 ) &&
            body.completed === undefined
        ) {
            return NextResponse.json( { message: 'No fields provided to update' }, { status: 400 } );
        }

        // Build the update object dynamically based on the provided fields
        const updateFields: { timelapsed?: string; score?: number; completed?: boolean; updated_at: Date; } = {
            updated_at: new Date(),
        };

        if ( body.timelapsed ) {
            formatTimelapsed( body.timelapsed );
            // Ensure timelapsed is in the correct HH:MM:SS format
            if ( !body.timelapsed.match( /^\d{2}:\d{2}:\d{2}$/ ) ) {
                return NextResponse.json( { message: 'Invalid TIME format for timelapsed' }, { status: 400 } );
            }
            updateFields.timelapsed = body.timelapsed;
        }

        if ( typeof body.score === 'number' ) {
            updateFields.score = body.score;
        }

        if ( typeof body.completed === 'boolean' ) {
            updateFields.completed = body.completed;
        }

        // Find and update the score entry
        const [updatedCount] = await Score.update( updateFields, {
            where: { id },
        } );

        if ( updatedCount === 0 ) {
            return NextResponse.json( { message: 'Score not found or no changes made' }, { status: 404 } );
        }

        return NextResponse.json( { message: 'Score updated successfully' }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error updating score:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
