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
                user_id: userId,
                quiz_id: quizId,
            },
        } );

        if ( existingProgress ) {
            await existingProgress.update( {
                quiz_id: quizId,
                score_id: scoreId,
                question_id: questionId,
                completed,
                updatedAt: updated_at,
            } );
        } else {
            const progress_id = `${ userId }-${ quizId }-${ level }`;
            await Progress.create( {
                progress_id,
                level,
                user_id: userId,
                quiz_id: quizId,
                score_id: scoreId,
                question_id: questionId,
                total_questions,
                completed,
                createdAt: new Date(),
                updatedAt: new Date(),
            } );
        }
    } catch ( error ) {
        console.error( 'Error adding or updating quiz progress:', error );
        throw new Error( 'Failed to add or update quiz progress' );
    }
};