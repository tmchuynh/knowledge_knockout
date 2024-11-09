import { addUserToDatabase } from '@/backend/controllers/userController';
import { Progress, User } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
    try {
        const body = await request.json();
        const { userId, first_name, last_name, username, password, email, provider, providerId, quizId, updated_at, questionId, scoreId, completed } = body;

        if ( !userId || !quizId ) {
            return NextResponse.json( { error: 'User ID and quiz ID are required' }, { status: 400 } );
        }

        let userExists = await User.findOne( {
            where: { user_id: userId },
        } );

        if ( !userExists ) {
            userExists = await addUserToDatabase( userId, first_name, last_name, username, password, email, provider, providerId );
            if ( !userExists ) {
                return NextResponse.json( { error: 'User could not be created' }, { status: 500 } );
            }
        }

        const progress = await Progress.findOne( {
            where: { user_id: userId, quiz_id: quizId },
        } );

        if ( progress ) {
            await progress.update( {
                score_id: scoreId,
                completed,
                updatedAt: updated_at
            } );
            return NextResponse.json( { message: 'Progress updated successfully', progress } );
        } else {
            const progressId = `progress-${ userId }-${ quizId }`;
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