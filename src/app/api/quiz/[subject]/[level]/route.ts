import { Quiz, Question } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';

export async function GET( req: NextRequest, { params }: { params: { subject: string, level: string; }; } ) {
    try {
        const { subject, level } = await params;

        // Fetch quiz data by subject and level using LIKE for MySQL compatibility
        const quiz = await Quiz.findAll( {
            where: {
                subject: {
                    [Op.like]: subject // Case-insensitive match in MySQL
                },
                level: level
            }
        } );

        if ( !quiz ) {
            return NextResponse.json( { message: 'Quiz not found' }, { status: 404 } );
        }

        return NextResponse.json( quiz, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching quiz data:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
