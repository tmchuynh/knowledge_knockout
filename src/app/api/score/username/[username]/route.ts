import { NextResponse } from 'next/server';
import { Quiz, Score, User } from '@/backend/models';
import { formatTimelapsed } from '@/utils/formatUtils';

export async function POST(
    request: Request,
    props: { params: { username: string; }; }
) {
    const { username } = await props.params;

    try {
        console.log( "USERNAME", username );
        const { id, quiz_id, score, user, timelapsed } = await request.json();

        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        console.log( "information given", id, quiz_id, score, user, timelapsed );

        // Validate input data
        if ( !quiz_id ) {
            return NextResponse.json( { error: 'Quiz ID is required' }, { status: 400 } );
        }

        // Find or create the score entry
        const [scoreEntry, scoreCreated] = await Score.findOrCreate( {
            where: {
                id,
                username: username,
                quiz_id: quiz_id,
                completed: false,
            },
            defaults: {
                score: score,
                timelapsed: formatTimelapsed( timelapsed )
            },
        } );

        if ( scoreCreated ) {
            console.log( 'New score entry created:', scoreEntry );
        } else {
            console.log( 'Score entry already exists:', scoreEntry );
        }

        return NextResponse.json( { score_id: scoreEntry.id, created: scoreCreated }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error initializing score:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}


export async function GET(
    _request: Request,
    props: { params: { username: string; }; }
) {
    const { username } = await props.params;

    try {
        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        // Find the user by username
        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Fetch all scores associated with the user
        const scores = await Score.findAll( {
            where: { username: user.username },
            order: [['created_at', 'DESC']],
        } );

        return NextResponse.json( scores, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}