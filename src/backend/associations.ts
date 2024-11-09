import Quiz from "./models/Quiz";
import Score from "./models/Score";

export default function setupAssociations() {
    Quiz.hasMany( Score, { foreignKey: 'quiz_id', as: 'scores' } );
    Score.belongsTo( Quiz, { foreignKey: 'quiz_id', as: 'quiz' } );
}
