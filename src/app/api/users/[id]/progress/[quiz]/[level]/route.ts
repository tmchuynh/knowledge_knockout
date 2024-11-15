import { Progress, Quiz, User } from '@/src/backend/models';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST( request: Request, res: NextApiResponse ) {
    try {
        const body = await request.json();
        const { quizName } = body; // Extract quizName from request body
        const { userId, questionId, index, scoreId, completed, updated_at } = quizName;

        if ( !quizName || !quizName.name || !quizName.level ) {
            return NextResponse.json( { error: 'Quiz name and level are required' }, { status: 400 } );
        }

        // Validate the user
        let user = await User.findOne( { where: { id: userId } } );
        if ( !user ) {
            return res.status( 404 ).json( { error: 'User not found' } );
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

        return res.status( 500 ).json( { error: 'Failed to retrieve data' } );
    }
}



export async function GET( request: Request, res: NextApiResponse ) {
    try {
        const { searchParams } = new URL( request.url );
        const userId = searchParams.get( 'userId' )!;
        const quizId = searchParams.get( 'quizId' )!;
        const progressId = `progress-${ userId }-${ quizId }`;

        const quizzes = await Quiz.findAll();
        const user = await User.findOne( { where: { user_id: userId } } );

        if ( !user ) {
            res.status( 404 ).json( { error: 'User not found' } );
        }

        const progress = await Progress.findAll( { where: { user_id: user?.id } } );

        if ( !progress ) {
            return NextResponse.json( { error: 'Progress not found' }, { status: 404 } );
        }

        return res.status( 200 ).json( { quizzes, user, progress } );
    } catch ( error ) {
        console.error( 'Error fetching user progress:', error );
        return res.status( 500 ).json( { error: 'Failed to retrieve data' } );
    }
}