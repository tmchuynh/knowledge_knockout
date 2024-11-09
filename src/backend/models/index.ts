// models/index.ts
import User from './User';
import Quiz from './Quiz';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import sequelize from '../config/db';
import Progress from './Progress';



sequelize.sync().then( () => {
    console.log( 'Database & tables created!' );
} );


export {
    sequelize,
    User,
    Quiz,
    Question,
    Answer,
    Progress,
    Score,
};

