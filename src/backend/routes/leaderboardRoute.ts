import { Router } from 'express';

const leaderboardRouter = Router();

// Route: /api/leaderboard/[quiz]
leaderboardRouter.get( '/:quiz', ( req, res ) => {
    const quiz = req.params.quiz;
    // Logic to fetch leaderboard data for the quiz
    res.redirect( `/ leaderboard/${ quiz }` );
} );

export default leaderboardRouter;
