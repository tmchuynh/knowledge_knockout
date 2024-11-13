import { processUser } from '@/backend/controllers/userController';
import { Progress, User } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
    try {
        const body = await request.json();
        const { quizName } = body; // Extract quizName from request body
        const { userId, questionId, index, scoreId, completed, updated_at } = quizName;

        if ( !quizName || !quizName.name || !quizName.level ) {
            return NextResponse.json( { error: 'Quiz name and level are required' }, { status: 400 } );
        }

        // Validate the user
        let userExists = await User.findOne( { where: { id: userId } } );
        if ( !userExists ) {
            // Create the user if not found (assuming processUser handles user creation)
            userExists = await processUser( userId, quizName.first_name, quizName.last_name, quizName.username, quizName.password, quizName.email ) ?? null;
            if ( !userExists ) {
                return NextResponse.json( { error: 'User could not be created' }, { status: 500 } );
            }
        }

        // Check for existing progress
        const progress = await Progress.findOne( {
            where: { id: userId, score_id: scoreId, question_id: questionId },
        } );

        if ( progress ) {
            // Update existing progress
            await progress.update( {
                score_id: scoreId,
                completed,
                updated_at: updated_at || new Date(),
            } );
            return NextResponse.json( { message: 'Progress updated successfully', progress } );
        } else {
            // Create new progress
            const progressId = `progress-${ userId }-${ quizName.name }`;
            const newProgress = await Progress.create( {
                id: progressId,
                question_id: questionId,
                score_id: scoreId,
                level: index,
                total_questions: 1,
                completed,
                created_at: new Date(),
                updated_at: new Date(),
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

        const progress = await Progress.findAll( {
            where: {
                id: progressId,
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