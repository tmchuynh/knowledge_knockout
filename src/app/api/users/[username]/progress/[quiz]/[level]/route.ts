import { Progress, Quiz, User } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';

// POST Handler to update or create user progress
export async function POST(
    request: NextRequest,
    { params }: { params: { username: string; quiz: string; level: string; }; }
) {
    try {
        const { username, quiz, level } = params;
        const { question_id, completed } = await request.json();

        if ( !username || !quiz || !level ) {
            return NextResponse.json( { error: 'Missing required parameters' }, { status: 400 } );
        }

        // Validate that the user exists
        const foundUser = await User.findOne( { where: { username } } );
        if ( !foundUser ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Validate that the quiz exists
        const foundQuiz = await Quiz.findOne( { where: { subject: quiz } } );
        if ( !foundQuiz ) {
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        // Create or update progress
        const [progress, created] = await Progress.findOrCreate( {
            where: {
                user_id: foundUser.id,
                quiz_id: foundQuiz.id,
                level,
                question_id,
            },
            defaults: {
                user_id: foundUser.id,
                quiz_id: foundQuiz.id,
                level,
                question_id,
                completed,
            },
        } );

        if ( !created ) {
            // Update existing progress if needed
            await progress.update( { question_id, completed, updated_at: Date.now() } );
        }

        return NextResponse.json(
            { message: 'Progress initialized/updated successfully', progress },
            { status: 200 }
        );
    } catch ( error ) {
        console.error( 'Error initializing/updating progress:', error );
        return NextResponse.json( { error: 'Failed to initialize/update progress' }, { status: 500 } );
    }
}

// GET Handler to fetch user progress
export async function GET(
    request: Request,
    { params }: { params: { username: string; quiz: string; level: number; }; }
) {

    try {
        let { username, quiz, level } = await params;
        level++;

        console.log( 'Received parameters:', username, quiz, level );

        if ( !username || !quiz || !level ) {
            return NextResponse.json( { error: 'Missing required parameters' }, { status: 400 } );
        }

        // Fetch user
        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            console.log( "couldn't find user" );
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Fetch quiz infor
        const _quiz = await Quiz.findOne( {
            where: { subject: quiz, level: level },
        } );

        if ( !quiz ) {
            console.log( "couldn't find quiz" );
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        // Fetch progress
        const progress = await Progress.findAll( { where: { user_id: user.id, quiz_id: _quiz?.id } } );
        if ( !progress.length ) {
            console.log( "couldn't find progress" );
            return NextResponse.json( { error: 'Progress not found' }, { status: 404 } );
        }

        return NextResponse.json( { progress }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching user progress:', error );
        return NextResponse.json( { error: 'Failed to retrieve data' }, { status: 500 } );
    }
}
