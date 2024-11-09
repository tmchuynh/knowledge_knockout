// app/quiz/[slug]/difficulty/[id]/page.tsx

'use client';

import { Answer, Question } from '@/types';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const QuizPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split( '/' ).filter( Boolean );
    const currentTitle = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';
    const level = parseInt( segments[3] );
    const question_id = parseInt( segments[4] );

    const [questions, setQuestions] = useState<Question[]>( [] );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState( 0 );
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>( [] );
    const [scoreId, setScoreId] = useState<number | null>( null );
    const [userInput, setUserInput] = useState<string>( '' );
    const [result, setResult] = useState<string | null>( null );

    useEffect( () => {
        const fetchQuestionData = async () => {
            if ( currentTitle ) {
                try {
                    // Fetch quiz data to get quiz_id
                    const quizRes = await fetch( `/api/quizzes/${ encodeURIComponent( currentTitle ) }` );
                    const quizData = await quizRes.json();

                    if ( quizData.error ) {
                        console.error( 'Error fetching quiz:', quizData.error );
                        return;
                    }

                    // Fetch questions for the quiz
                    const questionsRes = await fetch(
                        `/api/quizzes/${ encodeURIComponent( currentTitle ) }/difficulty/${ level }/questions`
                    );
                    const questionsData = await questionsRes.json();

                    if ( questionsData.error ) {
                        console.error( 'Error fetching questions:', questionsData.error );
                        return;
                    }

                    // Shuffle questions
                    const questionsShuffled = questionsData.questions.sort( () => Math.random() - 0.5 );

                    // Fetch answers for each question
                    const questionsWithAnswers = await Promise.all(
                        questionsShuffled.map( async ( question: Question ) => {
                            const answersRes = await fetch( `/api/questions/${ question.question_id }/answers` );
                            const answersData = await answersRes.json();

                            if ( answersData.error ) {
                                console.error( `Error fetching answers for question ${ question.question_id }:`, answersData.error );
                                return { ...question, answers: [] }; // Return question with empty answers array
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
            // try {
            //     const userId = user?.sub;

            //     if ( !userId ) {
            //         console.error( 'User ID is undefined.' );
            //         return;
            //     }

            //     const res = await fetch( '/api/scores/init', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify( { user_id: userId, level, quiz_id: quizId, total_questions: totalQuestions } ),
            //     } );

            //     const data = await res.json();

            //     if ( res.ok ) {
            //         setScoreId( data.score_id );
            //     } else {
            //         console.error( 'Failed to initialize score:', data.error );
            //     }
            // } catch ( error ) {
            //     console.error( 'Failed to initialize score:', error );
            // }
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
        }

        // Automatically go to the next question
        goToNextQuestion();
    };


    const handleWrittenAnswerSubmit = async () => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const userAnswer = userInput.trim();

        if ( userAnswer === '' ) {
            // Automatically go to the next question if the input is empty
            goToNextQuestion();
            return;
        }

        // Get the correct answers
        const correctAnswers = currentQuestion.answers
            .filter( ( answer: Answer ) => answer.is_correct )
            .map( ( answer: Answer ) => answer.answer_text );

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
            // Update the score if the answer is correct
            if ( scoreId ) {
                await fetch( '/api/scores/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { score_id: scoreId, increment: 1 } ),
                } );
            }
        }

        // Automatically go to the next question
        goToNextQuestion();
    };



    const goToNextQuestion = () => {
        setUserInput( '' );

        if ( currentQuestionIndex < shuffledQuestions.length - 1 ) {
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
        } else {
            // Quiz is finished
            router.push( `/quiz/${ encodeURIComponent( currentTitle ) }/difficulty/${ level }/result?scoreId=${ scoreId }` );
        }
    };



    return (
        <div className="flex flex-col min-h-full justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h1 className="text-center text-2xl py-5 font-extrabold dark:text-white">{currentQuestion.question_text}</h1>
            {currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type == "true_false" ? (
                <div className='w-full flex flex-col'>
                    <div className="grid grid-cols-2 gap-4 p-3">
                        {currentQuestion.answers.map( ( answers: Answer ) => (
                            <button className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
                                key={answers.answer_id}
                                onClick={() => handleSubmitAnswer( answers.is_correct )}
                            >
                                {answers.answer_text}
                            </button>
                        ) )}
                    </div>
                </div>
            ) : (
                <div className='w-full flex flex-col'>
                    <div className="grid grid-cols-1 p-3">
                        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Input your answer</label>
                        <input
                            className='bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            type="text"
                            value={userInput}
                            onChange={( e ) => setUserInput( e.target.value )}
                            onKeyDown={( e ) => {
                                if ( e.key === 'Enter' ) {
                                    handleWrittenAnswerSubmit();
                                }
                            }}
                        />
                    </div>
                    <button className="button text-white mx-3 flex-end bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center" onClick={handleWrittenAnswerSubmit} >
                        Next Question
                    </button>
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
