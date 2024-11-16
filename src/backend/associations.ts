import { User, Question, Answer } from "./models";
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

}


export { User, Question, Answer, Quiz, Score };