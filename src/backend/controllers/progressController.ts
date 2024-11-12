import { Progress } from "../models";

export const addOrUpdateQuizProgress = async (
    userId: string,
    quizId: string,
    scoreId: string,
    questionId: string,
    level: number,
    updated_at: Date,
    completed: boolean,
    total_questions: number
): Promise<void> => {
    try {
        const existingProgress = await Progress.findOne( {
            where: {
                question_id: questionId,
            },
        } );

        if ( existingProgress ) {
            await existingProgress.update( {
                score_id: scoreId,
                question_id: questionId,
                completed,
            } );
        } else {
            const progress_id = `${ userId }-${ quizId }-${ level }`;
            await Progress.create( {
                id: progress_id,
                question_id: questionId,
                score_id: scoreId,
                level,
                total_questions,
                completed,
            } );
        }
    } catch ( error ) {
        console.error( 'Error adding or updating quiz progress:', error );
        throw new Error( 'Failed to add or update quiz progress' );
    }
};