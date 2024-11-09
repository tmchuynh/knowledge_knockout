// models/index.ts
import User from './User';
import Quiz from './Quiz';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import sequelize from '../config/db';
import Progress from './Progress';


// Association between User and Quiz
User.hasMany( Quiz, { foreignKey: 'user_id' } );
Quiz.belongsTo( User, { foreignKey: 'user_id' } );

// Association between Quiz and Question
Quiz.hasMany( Question, { foreignKey: 'quiz_id' } );
Question.belongsTo( Quiz, { foreignKey: 'quiz_id' } );

// Association between Question and Answer
Question.hasMany( Answer, { foreignKey: 'question_id' } );
Answer.belongsTo( Question, { foreignKey: 'question_id' } );

// Association between Quiz and Score
Quiz.hasMany( Score, { foreignKey: 'quiz_id' } );
Score.belongsTo( Quiz, { foreignKey: 'quiz_id' } );

// Association between Score and User
Score.belongsTo( User, { foreignKey: 'user_id' } );
User.hasMany( Score, { foreignKey: 'user_id' } );

// Association between Progress and User
Progress.belongsTo( User, { foreignKey: 'user_id' } );
User.hasMany( Progress, { foreignKey: 'user_id' } );

// Association between Progress and Quiz
Progress.belongsTo( Quiz, { foreignKey: 'quiz_id' } );
Quiz.hasMany( Progress, { foreignKey: 'quiz_id' } );

// Association between Progress and Score
Progress.belongsTo( Score, { foreignKey: 'score_id' } );
Score.hasMany( Progress, { foreignKey: 'score_id' } );


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

