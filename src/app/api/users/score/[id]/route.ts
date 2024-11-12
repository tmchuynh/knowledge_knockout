import { Score } from "@/backend/models";
import { NextResponse } from "next/server";

export async function GET( request: Request, { params }: { params: { id: string; }; } ) {
    try {
        console.log( 'Fetching score with ID:', params.id );

        // Query the Score model based on the `score_id` field
        const score = await Score.findAll( {
            where: { user_id: params.id }, // Use the correct field name
        } );

        if ( !score || score.length === 0 ) {
            return NextResponse.json( { error: 'Score not found.' }, { status: 404 } );
        }

        return NextResponse.json( score );
    } catch ( error ) {
        console.error( 'Error fetching score:', error );
        return NextResponse.json( { error: 'Failed to fetch score.' }, { status: 500 } );
    }
}