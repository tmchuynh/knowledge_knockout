import { Progress, Quiz, User } from '@/backend/models';
import { NextResponse } from 'next/server';

// POST Handler to update or create user progress
export async function POST( request: Request ) {
    try {
        const body = await request.json();
        const { userId, questionId, index, scoreId, completed, updated_at } = body;

        if ( !userId || !questionId || !scoreId || index === undefined || completed === undefined ) {
            return NextResponse.json( { error: 'Missing required fields' }, { status: 400 } );
        }

        // Validate the user
        const user = await User.findOne( { where: { id: userId } } );
        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Check for existing progress
        let progress = await Progress.findOne( {
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
            const progressId = `progress-${ userId }-${ questionId }`;
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

        return NextResponse.json( { error: 'Failed to process user progress' }, { status: 500 } );
    }
}

// GET Handler to fetch user progress
export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL( request.url );
        const userId = searchParams.get( 'userId' );
        const quizId = searchParams.get( 'quizId' );

        if ( !userId || !quizId ) {
            return NextResponse.json( { error: 'User ID and Quiz ID are required' }, { status: 400 } );
        }

        const user = await User.findOne( { where: { id: userId } } );
        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        const progress = await Progress.findAll( { where: { user_id: userId, quiz_id: quizId } } );
        if ( !progress.length ) {
            return NextResponse.json( { error: 'Progress not found' }, { status: 404 } );
        }

        const quizzes = await Quiz.findAll();

        return NextResponse.json( { quizzes, user, progress } );
    } catch ( error ) {
        console.error( 'Error fetching user progress:', error );
        return NextResponse.json( { error: 'Failed to retrieve data' }, { status: 500 } );
    }
}
