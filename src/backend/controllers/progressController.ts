import { Request, Response, RequestHandler } from 'express';
import { Progress } from '@/backend/models';

// Get user progress
export const getProgress: RequestHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        const progress = await Progress.findAll( { where: { user_id: userId } } );

        if ( !progress ) {
            res.status( 404 ).json( { message: 'Progress not found' } );
            return;
        }

        res.status( 200 ).json( progress );
    } catch ( error ) {
        console.error( 'Error fetching progress:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};

// Update user progress
export const updateProgress: RequestHandler = async ( req, res ) => {
    try {
        const { userId } = req.params;
        const { completed } = req.body;

        const progress = await Progress.findOne( { where: { user_id: userId } } );

        if ( !progress ) {
            res.status( 404 ).json( { message: 'Progress not found' } );
            return;
        }

        await progress.update( { completed } );
        res.status( 200 ).json( { message: 'Progress updated successfully' } );
    } catch ( error ) {
        console.error( 'Error updating progress:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};
