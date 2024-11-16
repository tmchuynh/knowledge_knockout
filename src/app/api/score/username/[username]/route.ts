import { NextResponse } from 'next/server';
import { Quiz, Score, User } from '@/backend/models';

export async function POST(
    request: Request,
    props: { params: { username: string; }; }
) {
    const { username } = await props.params;

    try {
        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        const { quiz_id, score, user, level, timelapsed } = await request.json();

        // Validate input data
        if ( !quiz_id ) {
            return NextResponse.json( { error: 'Quiz ID is required' }, { status: 400 } );
        }

        const id = `${ quiz_id }-${ level }-${ user.id }`;
        // Find or create the score entry
        const [scoreEntry, scoreCreated] = await Score.findOrCreate( {
            where: {
                id,
                username: user.username,
                quiz_id: quiz_id,
            },
            defaults: {
                score: score,
                timelapsed: timelapsed
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
            include: [{ model: Quiz, as: 'quiz' }],
            order: [['created_at', 'DESC']],
        } );

        return NextResponse.json( scores, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}