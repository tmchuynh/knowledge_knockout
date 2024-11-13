import User from './User';
import Quiz from './Quiz';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import Progress from './Progress';
import sequelize from '../config/db';

// Associations

// Association between User and Quiz
User.hasMany( Quiz, { foreignKey: 'id' } );
Quiz.belongsTo( User, { foreignKey: 'id' } );

// Association between Quiz and Question
Quiz.hasMany( Question, { foreignKey: 'id' } );
Question.belongsTo( Quiz, { foreignKey: 'id' } );

// Association between Question and Answer
Question.hasMany( Answer, { foreignKey: 'id' } );
Answer.belongsTo( Question, { foreignKey: 'id' } );

// Association between Quiz and Score
Quiz.hasMany( Score, { foreignKey: 'id' } );
Score.belongsTo( Quiz, { foreignKey: 'id' } );

// Association between Progress and User
Progress.belongsTo( User, { foreignKey: 'id' } );
User.hasMany( Progress, { foreignKey: 'id' } );

// Association between Progress and Quiz
Progress.belongsTo( Quiz, { foreignKey: 'id' } );
Quiz.hasMany( Progress, { foreignKey: 'id' } );

// Association between Progress and Score
Progress.belongsTo( Score, { foreignKey: 'id' } );
Score.hasMany( Progress, { foreignKey: 'id' } );

// Association between Progress and User
Progress.belongsTo( User, { foreignKey: 'id' } );
User.hasMany( Progress, { foreignKey: 'id' } );

sequelize.sync( { force: false } ).then( () => {
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
