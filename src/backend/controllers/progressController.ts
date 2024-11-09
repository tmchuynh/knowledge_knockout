import { Progress } from "../models";

export const addOrUpdateQuizProgress = async (
    userId: string,
    quizId: string,
    currentQuestionIndex: number = 0,
    score: number = 0,
    completed: boolean = false,
    dateCompleted: Date | null = null
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
                current_question_index: currentQuestionIndex,
                score: score,
                completed: completed,
                date_completed: dateCompleted,
            } );
        } else {
            await Progress.create( {
                user_id: userId,
                quiz_id: quizId,
                current_question_index: currentQuestionIndex,
                score: score,
                completed: completed,
                date_completed: dateCompleted,
            } );
        }
    } catch ( error ) {
        console.error( 'Error adding or updating quiz progress:', error );
        throw new Error( 'Failed to add or update quiz progress' );
    }
};