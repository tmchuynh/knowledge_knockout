import { Quiz } from "../models";

export const getQuizByTitle = async ( title: string ) => {
    try {
        // Fetch the quiz by title from the database
        const quiz = await Quiz.findOne( {
            where: { title },
        } );

        if ( !quiz ) {
            console.log( 'Quiz not found' );
            return null;
        }

        return quiz;
    } catch ( error ) {
        console.error( 'Error fetching quiz by title:', error );
        throw error;
    }
};