'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Answer, Question, Quiz, Score, User } from '@/types/interface';
import Timer from '@/components/Timer';

const QuizPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split( '/' ).filter( Boolean );
    const subject = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';
    let level = parseInt( segments[2] );

    const [questions, setQuestions] = useState<Question[]>( [] );
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState( 0 );
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [scoreId, setScoreId] = useState<string | null>( null );
    const [score, setScore] = useState<number>( 0 );
    const [userInput, setUserInput] = useState<string>( '' );
    const [user, setUser] = useState<User>();
    const [result, setResult] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                const response = await fetch( '/api/auth/me', {
                    credentials: 'include',
                } );

                if ( !response.ok ) {
                    throw new Error( 'Failed to fetch user data' );
                }

                const userData = await response.json();
                setUser( userData );
                console.log( userData );


                const questions = await fetchQuizzesData();
                const scoreExists = await getScoreData( userData, questions );
                console.log( scoreExists );
                if ( !scoreExists ) {
                    console.log( "createScore" );
                    await createScoreData( userData, questions );
                }

            } catch ( error ) {
                console.error( 'Error fetching user data:', error );
            }
        };


        const fetchQuizzesData = async () => {
            try {
                const quizResponse = await fetch(
                    `/api/quiz/${ encodeURIComponent( subject ) }`,
                    {
                        credentials: 'include',
                    }
                );

                if ( !quizResponse.ok ) {
                    throw new Error( 'Failed to fetch quiz data' );
                }

                const quizData = await quizResponse.json();
                setQuizzes( quizData );

                console.log( quizData );

                const questionResponse = await fetch( `/api/quiz/id/${ quizData[level].id }/${ level }`, {
                    credentials: 'include',
                } );
                const questionsData = await questionResponse.json();
                setQuestions( questionsData.questions );
                setCurrentQuestion( questionsData.questions[0] );
                console.log( "questionData", questionsData.questions );

                setLoading( false );
                return questionsData.questions;
            } catch ( error ) {
                setError( 'Error fetching data' );
                setLoading( false );
            }
        };

        const getScoreData = async ( userData: User, questions: Question[] ) => {
            const score_id = createScoreId( questions, level, userData );

            try {
                const res = await fetch( `/api/score/${ score_id }`, {
                    credentials: 'include',
                } );

                if ( !res.ok ) {
                    throw new Error( 'Failed to fetch score data' );
                }

                const scoreData = await res.json();
                setScore( scoreData.score );
                setScoreId( scoreData.id );
                return true;
            } catch ( error ) {
                console.log( error );
                setLoading( false );
                return false;
            }
        };

        const createScoreData = async ( userData: User, questions: Question[] ) => {
            const array = questions[0].id.split( "-" );
            const quizId = array[1];

            try {
                const res = await fetch( `/api/score/username/${ userData.username }`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( { quiz_id: quizId, level, score, user: userData, timelapsed: '00:00:00' } ),
                } );

                if ( res.ok ) {
                    const data = await res.json();
                    setScoreId( data.score_id );
                } else {
                    throw new Error( 'Failed to create score' );
                }
            } catch ( error ) {
                console.log( error );
                setError( 'Failed to initialize score' );
                setLoading( false );
                return;
            }
        };

        fetchUserData();
    }, [subject] );

    if ( loading ) return <div>Loading...</div>;
    if ( error ) return <div className="text-red-500">{error}</div>;

    const handleSubmitAnswer = async ( isCorrect: boolean ) => {
        if ( isCorrect && scoreId ) {
            await fetch( `/api/scores/${ scoreId }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id: scoreId, score: score + 1 } ),
            } );
            setScore( score + 1 );
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
            await fetch( `/api/scores/${ scoreId }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id: scoreId, score: score + 1 } ),
            } );
            setScore( score + 1 );
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

function createScoreId( questions: Question[], level: number, userData: User ) {
    console.log( questions );
    const array = questions[0].id.split( "-" );
    const quizId = array[1];
    const score_id = `${ quizId }-${ level + 1 }-${ userData?.id }`;
    return score_id;
}

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
