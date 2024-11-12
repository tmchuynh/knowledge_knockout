import { Router } from 'express';

const quizRouter = Router();

quizRouter.get( '/quiz', ( req, res ) => {
    res.redirect( '/quiz' );
} );

// Route: /api/quiz/[name]
quizRouter.get( '/:name', ( req, res ) => {
    const quizName = req.params.name;
    // Logic to fetch quiz by name
    res.redirect( `/quiz/ ${ quizName }` );
} );

// Route: /api/quiz/[name]/[level]
quizRouter.get( '/:name/:level', ( req, res ) => {
    const { name, level } = req.params;
    // Logic to fetch quiz level data
    res.redirect( `/quiz/ ${ name }/${ level }` );

} );

// Route: /api/quiz/[name]/[level]/[id]
quizRouter.get( '/:name/:level/:id', ( req, res ) => {
    const { name, level, id } = req.params;
    // Logic to fetch specific question in the quiz
    res.redirect( `/quiz/ ${ name }/${ level }/${ id }` );
} );

export default quizRouter;
