import User from './User';
import Quiz from './Quiz';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import sequelize from '../config/db';

// Associations

// Association between User and Quiz
User.hasMany( Quiz, { foreignKey: 'id' } );
Quiz.belongsTo( User, { foreignKey: 'id' } );

// Association between Quiz and Question
Quiz.hasMany( Question, { foreignKey: 'id' } );
Question.belongsTo( Quiz, { foreignKey: 'id' } );

// Association between Question and Answer
Question.hasMany( Answer, { as: 'answers', foreignKey: 'question_id' } );
Answer.belongsTo( Question, { as: 'question', foreignKey: 'question_id' } );

// Association between Quiz and Score
Quiz.hasMany( Score, { as: 'score', foreignKey: 'quiz_id' } );
Score.belongsTo( Quiz, { as: 'quiz', foreignKey: 'quiz_id' } );

sequelize.sync( { force: false } ).then( () => {
    console.log( 'Database & tables created!' );
} );

export {
    sequelize,
    User,
    Quiz,
    Question,
    Answer,
    Score,
};
