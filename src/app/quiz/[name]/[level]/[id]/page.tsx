'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Answer, Question, Quiz, Score, User } from '@/types/interface';
import Timer from '@/components/Timer';
import { generateRandomString } from '@/utils/regUtils';

const QuizPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split( '/' ).filter( Boolean );
    const subject = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';
    let level = parseInt( segments[2] );

    const [questions, setQuestions] = useState<Question[]>( [] );
    const [quiz, setQuiz] = useState<Quiz>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState( 0 );
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [scoreId, setScoreId] = useState<string | null>( null );
    const [score, setScore] = useState<number>( 0 );
    const [userInput, setUserInput] = useState<string>( '' );
    const [user, setUser] = useState<User>();
    const [result, setResult] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( true );
    const [error, setError] = useState<string | null>( null );
    let createdNewScore = false;

    useEffect( () => {
        const handleFunctions = async () => {
            if ( createdNewScore ) return;
            createdNewScore = true;
            try {
                const user = await fetchUserData();
                if ( !user ) {
                    throw new Error( 'User data not available' );
                }

                const quiz_id = await fetchQuizzesData();
                if ( !quiz_id ) {
                    throw new Error( 'Quiz data not available' );
                }

                const questions = await fetchQuestions( quiz_id );
                if ( questions && questions.questions.length > 0 ) {
                    setCurrentQuestion( questions.questions[0] );
                } else {
                    console.warn( 'No questions found for the quiz.' );
                }

                const postId = `${ quiz_id }-${ level + 1 }-${ user.id }`;

                // Check if the score already exists
                const scoreExists = await getScoreData( postId );
                if ( scoreExists ) {
                    console.log( 'A score entry already exists and is not completed.' );
                } else {
                    // Ensure this block runs only once to prevent duplicate creation
                    console.log( 'Creating new score entry...' );
                    const uuidID = generateRandomString( 5 );
                    const id = `${ uuidID }-${ quiz_id }-${ level + 1 }-${ user.id }`;
                    console.log( 'Generated Score ID:', id );

                    await createScoreData( user, id, quiz_id, "00:00:00" );
                }
            } catch ( error ) {
                console.error( 'Error in handleFunctions:', error );
                setError( 'An error occurred during initialization.' );
                setLoading( false );
            } finally {
                createdNewScore = false;
            }
        };

        handleFunctions();
    }, [] );


    const fetchUserData = async () => {
        try {
            const response = await fetch( '/api/auth/me', {
                credentials: 'include',
            } );

            if ( !response.ok ) {
                throw new Error( 'Failed to fetch user data' );
            }

            const userData = await response.json();
            console.log( "user data: " + JSON.stringify( userData ) );
            setUser( userData );
            return userData;
        } catch ( error ) {
            console.error( 'Error fetching user data:', error );
        }
    };

    const fetchQuestions = async ( quiz_id: string ) => {
        try {
            // Call the new API route for fetching quiz data by subject and level
            const response = await fetch(
                `/api/quiz/id/${ quiz_id }/${ level + 1 }`,
                {
                    credentials: 'include',
                }
            );

            if ( !response.ok ) {
                throw new Error( 'Failed to fetch questions data' );
            }

            const questions = await response.json();
            setQuestions( questions.questions );

            console.log( 'questions', questions );

            setLoading( false );
            return questions;
        } catch ( error ) {
            console.error( 'Error fetching data:', error );
            setError( 'Error fetching data' );
            setLoading( false );
        }
    };


    const fetchQuizzesData = async () => {
        try {
            // Call the new API route for fetching quiz data by subject and level
            const quizResponse = await fetch(
                `/api/quiz/${ encodeURIComponent( subject ) }/${ level + 1 }`,
                {
                    credentials: 'include',
                }
            );

            if ( !quizResponse.ok ) {
                throw new Error( 'Failed to fetch quiz data' );
            }

            const quizData = await quizResponse.json();
            setQuiz( quizData );

            console.log( 'quizData', quizData[0] );

            setLoading( false );
            return quizData[0].id;
        } catch ( error ) {
            console.error( 'Error fetching data:', error );
            setError( 'Error fetching data' );
            setLoading( false );
        }
    };


    const getScoreData = async ( postId: string ) => {
        try {
            const res = await fetch( `/api/score/find?partialId=${ postId }`, {
                credentials: 'include',
            } );

            if ( !res.ok ) {
                console.warn( `Score with partial ID ${ postId } not found.` );
                return false;
            }

            const scoreData = await res.json();
            console.log( 'scoreData', scoreData );

            // Check if the existing score has `completed` set to `false`
            if ( scoreData && scoreData.completed === false ) {
                setScoreId( scoreData.id ); // Set the actual ID if found
                return true; // A score entry exists and is not completed
            }

            return false; // Either no score exists or the score is completed
        } catch ( error ) {
            console.error( 'Error fetching score data:', error );
            return false;
        }
    };


    const createScoreData = async ( userData: User, id: string, quiz_id: string, timelapsed: string ) => {
        try {
            const res = await fetch( `/api/score/username/${ userData.username }`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id, quiz_id, score, user: userData, timelapsed } ),
            } );

            if ( res.ok ) {
                const data = await res.json();
                console.log( 'Score created:', data );
                setScoreId( data.score_id );
            } else {
                const errorText = await res.text();
                console.error( 'Failed to create score:', errorText );
                throw new Error( 'Failed to create score' );
            }
        } catch ( error ) {
            console.error( 'Error initializing score:', error );
            setError( 'Failed to initialize score' );
            setLoading( false );
        }
    };






    if ( loading ) return <div>Loading...</div>;
    if ( error ) return <div className="text-red-500">{error}</div>;

    const handleSubmitAnswer = async ( isCorrect: boolean ) => {
        if ( isCorrect && scoreId ) {
            const newScore = score + 1;
            const response = await fetch( `/api/score/${ scoreId }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id: scoreId, score: newScore } ),
            } );
            if ( !response.ok ) {
                throw new Error( 'Failed to update score' );
            }

            const scoreData = await response.json();

            setScore( scoreData.score );
        }

        goToNextQuestion();
    };

    const handleWrittenAnswerSubmit = async () => {
        const userAnswer = userInput.trim();

        if ( !userAnswer ) {
            goToNextQuestion();
            return;
        }

        const correctAnswers = currentQuestion?.answers
            .filter( ( answer: Answer ) => answer.is_correct )
            .map( ( answer: Answer ) => answer.content );

        const isCorrect = correctAnswers?.some( ( correctAnswer ) => {
            const distance = levenshtein( userAnswer, correctAnswer );
            const threshold = Math.floor( correctAnswer.length * 0.3 );
            return distance <= threshold;
        } );

        if ( isCorrect && scoreId ) {
            const newScore = score + 1;
            const response = await fetch( `/api/score/${ scoreId }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id: scoreId, score: newScore } ),
            } );
            if ( !response.ok ) {
                throw new Error( 'Failed to update score' );
            }

            const scoreData = await response.json();

            setScore( scoreData.score );
        }

        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        setUserInput( '' );

        if ( currentQuestionIndex < questions.length - 1 ) {
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
            setCurrentQuestion( questions[currentQuestionIndex] );
        } else {
            router.push( `/quiz/${ encodeURIComponent( subject ) }/${ level + 1 }/result?scoreId=${ scoreId }` );
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
                <Timer scoreId={scoreId} />
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
                <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">{currentQuestion?.content}</h2>
                {currentQuestion?.question_type === 'multiple_choice' || currentQuestion?.question_type === 'true_false' ? (
                    <div className="w-full flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentQuestion.answers.map( ( answer: Answer, index ) => (
                                <Button
                                    key={`${ answer.id }__${ index }`}
                                    onClick={() => handleSubmitAnswer( answer.is_correct )}
                                    className="text-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    {answer.content}
                                </Button>
                            ) )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col mt-4">
                        <label className="block mb-2 text-md font-medium">Input your answer</label>
                        <Input
                            type="text"
                            value={userInput}
                            onChange={( e ) => setUserInput( e.target.value )}
                            onKeyDown={( e ) => {
                                if ( e.key === 'Enter' ) {
                                    handleWrittenAnswerSubmit();
                                }
                            }}
                            className="mb-4 p-2 border rounded-md"
                        />
                        <Button
                            onClick={handleWrittenAnswerSubmit}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-md p-2"
                        >
                            Submit Answer
                        </Button>
                    </div>
                )}
                {result && <div className="mt-4 text-green-500">{result}</div>}
            </div>
        </>

    );
};



function levenshtein( a: string, b: string ): number {
    const an = a.length;
    const bn = b.length;
    const matrix = [];

    if ( an === 0 ) return bn;
    if ( bn === 0 ) return an;

    for ( let i = 0; i <= bn; i++ ) {
        matrix[i] = [i];
    }
    for ( let j = 0; j <= an; j++ ) {
        matrix[0][j] = j;
    }

    for ( let i = 1; i <= bn; i++ ) {
        for ( let j = 1; j <= an; j++ ) {
            if ( b.charAt( i - 1 ) === a.charAt( j - 1 ) ) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[bn][an];
}

export default QuizPage;
