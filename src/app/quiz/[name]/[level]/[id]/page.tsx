'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Answer, Question, Score } from '@/types/interface';

const QuizPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const segments = pathname.split( '/' ).filter( Boolean );
    const currentTitle = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';
    const level = parseInt( segments[3] );

    const [questions, setQuestions] = useState<Question[]>( [] );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState( 0 );
    const [scoreId, setScoreId] = useState<string | null>( null );
    const [score, setScore] = useState<number>( 0 );
    const [userInput, setUserInput] = useState<string>( '' );
    const [result, setResult] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const token = document.cookie.split( 'token=' )[1];
        if ( !token ) {
            setError( 'User not authenticated. Please log in.' );
            setLoading( false );
            return;
        }

        const fetchQuestionData = async () => {
            try {
                const quizRes = await fetch( `/api/quiz/${ encodeURIComponent( currentTitle ) }`, {
                    headers: {
                        Authorization: `Bearer ${ token }`,
                        'Content-Type': 'application/json',
                    },
                } );
                const quizData = await quizRes.json();

                if ( quizData.error ) {
                    setError( 'Failed to fetch quiz data' );
                    setLoading( false );
                    return;
                }

                const questionsRes = await fetch(
                    `/api/quiz/${ encodeURIComponent( currentTitle ) }/${ level }`,
                    {
                        credentials: 'include',
                    }
                );
                const questionsData = await questionsRes.json();

                if ( questionsData.error ) {
                    setError( 'Failed to fetch questions' );
                    setLoading( false );
                    return;
                }

                setQuestions( questionsData.questions );
                setLoading( false );

                if ( questionsData.questions.length > 0 && !scoreId ) {
                    await initializeScore( quizData.quiz_id, questionsData.questions.length );
                }
            } catch ( error ) {
                setError( 'Error fetching data' );
                setLoading( false );
            }
        };

        const initializeScore = async ( quizId: number, totalQuestions: number ) => {
            try {
                const res = await fetch( '/api/users/score', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( { quiz_id: quizId, level, total_questions: totalQuestions, score } ),
                } );

                const data = await res.json();
                if ( res.ok ) {
                    setScoreId( data.score_id );
                } else {
                    setError( 'Failed to initialize score' );
                }
            } catch ( error ) {
                setError( 'Failed to initialize score' );
            }
        };

        fetchQuestionData();
    }, [currentTitle] );

    const currentQuestion = questions[currentQuestionIndex];
    if ( loading ) return <div>Loading...</div>;
    if ( error ) return <div className="text-red-500">{error}</div>;

    const handleSubmitAnswer = async ( isCorrect: boolean ) => {
        if ( isCorrect && scoreId ) {
            await fetch( '/api/scores/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ document.cookie.split( 'token=' )[1] }`,
                },
                body: JSON.stringify( { score_id: scoreId, increment: 1 } ),
            } );
            setScore( score + 1 );
        }

        goToNextQuestion();
    };

    const handleWrittenAnswerSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = userInput.trim();

        if ( !userAnswer ) {
            goToNextQuestion();
            return;
        }

        const correctAnswers = currentQuestion.answers
            .filter( ( answer: Answer ) => answer.is_correct )
            .map( ( answer: Answer ) => answer.content );

        const isCorrect = correctAnswers.some( ( correctAnswer ) => {
            const distance = levenshtein( userAnswer, correctAnswer );
            const threshold = Math.floor( correctAnswer.length * 0.3 );
            return distance <= threshold;
        } );

        if ( isCorrect && scoreId ) {
            await fetch( '/api/scores/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ document.cookie.split( 'token=' )[1] }`,
                },
                body: JSON.stringify( { score_id: scoreId, increment: 1 } ),
            } );
        }

        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        setUserInput( '' );

        if ( currentQuestionIndex < questions.length - 1 ) {
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
        } else {
            router.push( `/quiz/${ encodeURIComponent( currentTitle ) }/difficulty/${ level }/result?scoreId=${ scoreId }` );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h1 className="text-3xl font-extrabold text-center mb-5">{currentQuestion.content}</h1>
            {currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type === 'true_false' ? (
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
