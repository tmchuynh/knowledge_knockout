import { Request, Response, RequestHandler } from 'express';
import { Score } from '@/backend/models';

// Get user scores
export const getScore: RequestHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        const scores = await Score.findAll( { where: { user_id: userId } } );

        if ( !scores ) {
            res.status( 404 ).json( { message: 'Scores not found' } );
            return;
        }

        res.status( 200 ).json( scores );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};

// Create a new score
export const createScore: RequestHandler = async ( req, res ) => {
    try {
        const { user_id, quiz_id, score, total_questions } = req.body;

        const newScore = await Score.create( {
            user_id,
            quiz_id,
            score,
            total_questions,
            quiz_date: new Date(),
        } );

        res.status( 201 ).json( { message: 'Score created successfully', newScore } );
    } catch ( error ) {
        console.error( 'Error creating score:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};

// Update score
export const updateScore: RequestHandler = async ( req, res ) => {
    try {
        const { scoreId } = req.params;
        const { increment } = req.body;

        const score = await Score.findByPk( scoreId );
        if ( !score ) {
            res.status( 404 ).json( { message: 'Score not found' } );
            return;
        }

        score.score += increment;
        await score.save();

        res.status( 200 ).json( { message: 'Score updated successfully', score } );
    } catch ( error ) {
        console.error( 'Error updating score:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};
