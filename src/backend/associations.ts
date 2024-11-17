import { User, Question, Answer } from "./models";
import Quiz from "./models/Quiz";
import Score from "./models/Score";

export default function setupAssociations() {
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
    Quiz.hasMany( Score, { as: 'score', foreignKey: 'id' } );
    Score.belongsTo( Quiz, { as: 'quiz', foreignKey: 'id' } );

}


export { User, Question, Answer, Quiz, Score };