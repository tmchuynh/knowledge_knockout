'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Answer, Question, Score } from '@/types';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const QuizPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split( '/' ).filter( Boolean );
    const currentTitle = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';
    const level = parseInt( segments[3] );

    const [questions, setQuestions] = useState<Question[]>( [] );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState( 0 );
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>( [] );
    const [scoreId, setScoreId] = useState<Score>();
    const [score, setScore] = useState<number>( 0 );
    const [userInput, setUserInput] = useState<string>( '' );
    const [result, setResult] = useState<string | null>( null );

    useEffect( () => {
        const fetchQuestionData = async () => {
            if ( currentTitle ) {
                try {
                    const quizRes = await fetch( `/api/quiz/${ encodeURIComponent( currentTitle ) }` );
                    const quizData = await quizRes.json();

                    if ( quizData.error ) {
                        console.error( 'Error fetching quiz:', quizData.error );
                        return;
                    }

                    const questionsRes = await fetch(
                        `/api/quiz/${ encodeURIComponent( currentTitle ) }/${ level }`
                    );
                    const questionsData = await questionsRes.json();

                    if ( questionsData.error ) {
                        console.error( 'Error fetching questions:', questionsData.error );
                        return;
                    }

                    const questionsShuffled = questionsData.questions.sort( () => Math.random() - 0.5 );

                    const questionsWithAnswers = await Promise.all(
                        questionsShuffled.map( async ( question: Question ) => {
                            const answersRes = await fetch( `/api/quiz/${ encodeURIComponent( currentTitle ) }/${ level }/${ question.question_id }` );
                            const answersData = await answersRes.json();

                            if ( answersData.error ) {
                                console.error( `Error fetching answers for question ${ question.question_id }:`, answersData.error );
                                return { ...question, answers: [] };
                            }

                            return { ...question, answers: answersData.answers };
                        } )
                    );

                    setShuffledQuestions( questionsWithAnswers );
                    setQuestions( questionsWithAnswers );

                    // Initialize score
                    if ( questionsWithAnswers.length > 0 && !scoreId ) {
                        await initializeScore( quizData.quiz_id, questionsWithAnswers.length );
                    }
                } catch ( error ) {
                    console.error( 'Error fetching data:', error );
                }
            }
        };

        const initializeScore = async ( quizId: number, totalQuestions: number ) => {
            try {
                const user = localStorage.getItem( 'user' );
                const userId = user ? JSON.parse( user ).id : null;

                if ( !userId ) {
                    console.error( 'User ID is undefined.' );
                    return;
                }

                const res = await fetch( '/api/users/score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { user_id: userId, level, quiz_id: quizId, total_questions: totalQuestions, score } ),
                } );

                const data = await res.json();

                if ( res.ok ) {
                    setScoreId( data.score_id );
                } else {
                    console.error( 'Failed to initialize score:', data.error );
                }
            } catch ( error ) {
                console.error( 'Failed to initialize score:', error );
            }
        };

        fetchQuestionData();

    }, [currentTitle] );

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if ( !currentQuestion ) return <div>Loading...</div>;
    if ( currentQuestion.answers.length === 0 ) {
        return <div>No answers available for this question.</div>;
    }
    console.log( "CURRENT QUESTION", currentQuestion );

    const handleSubmitAnswer = async ( isCorrect: boolean ) => {
        if ( isCorrect && scoreId ) {
            await fetch( '/api/scores/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { score_id: scoreId, increment: 1 } ),
            } );
            setScore( score + 1 );
        }

        goToNextQuestion();
    };


    const handleWrittenAnswerSubmit = async () => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const userAnswer = userInput.trim();

        if ( userAnswer === '' ) {
            goToNextQuestion();
            return;
        }

        const correctAnswers = currentQuestion.answers
            .filter( ( answer: Answer ) => answer.is_correct )
            .map( ( answer: Answer ) => answer.content );

        let isCorrect = false;

        for ( const correctAnswer of correctAnswers ) {
            // Calculate the Levenshtein distance between the user's answer and the correct answer
            const distance = levenshtein( userAnswer, correctAnswer );

            // Calculate the threshold (30% of the correct answer's length)
            const threshold = Math.floor( correctAnswer.length * 0.3 );

            // Check if the distance is within the acceptable threshold
            if ( distance <= threshold ) {
                isCorrect = true;
                break;
            }
        }


        if ( isCorrect ) {
            if ( scoreId ) {
                await fetch( '/api/scores/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { score_id: scoreId, increment: 1 } ),
                } );
            }
        }

        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        setUserInput( '' );

        if ( currentQuestionIndex < shuffledQuestions.length - 1 ) {
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
        } else {
            router.push( `/quiz/${ encodeURIComponent( currentTitle ) }/difficulty/${ level }/result?scoreId=${ scoreId }` );
        }
    };

    return (
        <div className="flex flex-col min-h-full justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h1 className="text-5xl font-extrabold text-stone text-center mb-5">{currentQuestion.content}</h1>
            {currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type == "true_false" ? (
                <div className='w-full flex flex-col'>
                    <div className="grid grid-cols-2 gap-4 p-3">
                        {currentQuestion.answers.map( ( answers: Answer ) => (
                            <Button
                                key={answers.answer_id}
                                onClick={() => handleSubmitAnswer( answers.is_correct )}
                            >
                                {answers.content}
                            </Button>
                        ) )}
                    </div>
                </div>
            ) : (
                <div className='w-full flex flex-col'>
                    <div className="grid grid-cols-1 p-3">
                        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Input your answer</label>
                        <Input
                            id={"written_answer_input"}
                            type={"text"}
                            value={userInput}
                            onChange={( e ) => setUserInput( e.target.value )}
                            onKeyDown={( e ) => {
                                if ( e.key === 'Enter' ) {
                                    handleWrittenAnswerSubmit();
                                }
                            }}
                        />
                    </div>
                    <Button
                        onClick={handleWrittenAnswerSubmit}
                    >
                        Bubmit Answer
                    </Button>
                </div>
            )}
            {result && <div>{result}</div>}
        </div>
    );
};

function levenshtein( a: string, b: string ): number {
    const an = a.length;
    const bn = b.length;
    const matrix = [];

    // If one of the strings is empty
    if ( an === 0 ) return bn;
    if ( bn === 0 ) return an;

    // Initialize the matrix
    for ( let i = 0; i <= bn; i++ ) {
        matrix[i] = [i];
    }
    for ( let j = 0; j <= an; j++ ) {
        matrix[0][j] = j;
    }

    // Populate the matrix
    for ( let i = 1; i <= bn; i++ ) {
        for ( let j = 1; j <= an; j++ ) {
            if ( b.charAt( i - 1 ) === a.charAt( j - 1 ) ) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[bn][an];
}


export default QuizPage;
