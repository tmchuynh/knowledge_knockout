import { User, Question, Answer, Progress } from "./models";
import Quiz from "./models/Quiz";
import Score from "./models/Score";

export default function setupAssociations() {
    // Association between Quiz and Question
    Quiz.hasMany( Question, { foreignKey: 'quiz_id' } );
    Question.belongsTo( Quiz, { foreignKey: 'quiz_id' } );

    // Association between Question and Answer
    Question.hasMany( Answer, { foreignKey: 'question_id' } );
    Answer.belongsTo( Question, { foreignKey: 'question_id' } );

    // Association between Quiz and Score
    Quiz.hasMany( Score, { foreignKey: 'quiz_id' } );
    Score.belongsTo( Quiz, { as: 'quiz', foreignKey: 'quiz_id' } );

    // Association between Score and User
    Score.belongsTo( User, { as: 'user', foreignKey: 'user_id' } );
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
}
