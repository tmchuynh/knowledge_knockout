import { addUserToDatabase } from '@/backend/controllers/userController';
import { User, Progress } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
    try {
        const body = await request.json();
        const { userId, quizId, updated_at, questionId, scoreId, completed } = body;

        // Validate required fields
        if ( !userId || !quizId ) {
            return NextResponse.json( { error: 'User ID and quiz ID are required' }, { status: 400 } );
        }

        // Check if the user exists
        let userExists = await User.findOne( {
            where: { user_id: userId },
        } );

        // If user doesn't exist, add the user to the database
        if ( !userExists ) {
            userExists = await addUserToDatabase( userId );
            if ( !userExists ) {
                return NextResponse.json( { error: 'User could not be created' }, { status: 500 } );
            }
        }

        // Check if user progress already exists
        const progress = await Progress.findOne( {
            where: { user_id: userId, quiz_id: quizId },
        } );

        if ( progress ) {
            // Update existing progress
            await progress.update( {
                score_id: scoreId,
                completed,
                updatedAt: updated_at
            } );
            return NextResponse.json( { message: 'Progress updated successfully', progress } );
        } else {
            const progressId = `progress-${ userId }-${ quizId }`;
            // Create new progress entry
            const newProgress = await Progress.create( {
                progress_id: progressId,
                user_id: userId,
                quiz_id: quizId,
                question_id: questionId,
                score_id: scoreId,
                level: 1,
                total_questions: 1,
                completed: completed,
                createdAt: new Date(),
                updatedAt: new Date()
            } );
            return NextResponse.json( { message: 'Progress created successfully', progress: newProgress } );
        }
    } catch ( error: any ) {
        console.error( 'Error processing user progress:', error );

        // Handle specific database errors if needed
        if ( error.code === 'ER_NO_REFERENCED_ROW_2' ) {
            return NextResponse.json( { error: 'Invalid user ID or quiz ID reference' }, { status: 400 } );
        }

        return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
    }
}


export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL( request.url );
        const userId = searchParams.get( 'userId' )!;
        const quizId = searchParams.get( 'quizId' )!;
        const progressId = `progress-${ userId }-${ quizId }`;

        if ( !userId || !quizId ) {
            return NextResponse.json( { error: 'User ID and quiz ID are required' }, { status: 400 } );
        }

        const progress = await Progress.findAll( {
            where: {
                progress_id: progressId,
                user_id: userId,
                quiz_id: quizId,
            },
        } );

        if ( !progress ) {
            return NextResponse.json( { error: 'Progress not found' }, { status: 404 } );
        }

        return NextResponse.json( progress );
    } catch ( error ) {
        console.error( 'Error fetching user progress:', error );
        return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
    }
}