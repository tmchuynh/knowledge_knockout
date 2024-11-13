import { NextResponse } from 'next/server';
import { fn, col, literal } from 'sequelize';
import { Score } from '@/backend/models';

export async function GET( _request: Request ) {
    try {
        const scoresData = await Score.findAll( {
            attributes: [
                [fn( 'DATE_FORMAT', col( 'created_at' ), '%Y%m%d' ), 'DATEID'],
                [fn( 'DATE_FORMAT', col( 'created_at' ), '%Y-%m-%d' ), 'DB_DATE'],
                [fn( 'DAY', col( 'created_at' ) ), 'DAY'],
                [fn( 'DATE_FORMAT', col( 'created_at' ), '%a' ), 'DAY_NAME_SHORT'],
                [fn( 'WEEKDAY', col( 'created_at' ) ), 'WEEKDAYNO'],
                [fn( 'WEEK', col( 'created_at' ) ), 'WEEKNO'],
                [literal( 'FLOOR((DAY(created_at) - 1) / 7)' ), 'WEEK_OF_MONTH'],
                [fn( 'DATE_FORMAT', col( 'created_at' ), '%Y%m' ), 'MONTHID'],
                [fn( 'DATE_FORMAT', col( 'created_at' ), '%b-%y' ), 'M_NAME'],
                [fn( 'YEAR', col( 'created_at' ) ), 'YEARID'],
                [fn( 'COUNT', col( 'id' ) ), 'score_count']
            ],
            group: ['DB_DATE'],
            order: [[col( 'DB_DATE' ), 'ASC']],
            raw: true // Ensure plain objects are returned
        } );

        console.log( 'Fetched scores data:', scoresData );

        return NextResponse.json( scoresData );
    } catch ( error ) {
        console.error( 'Error fetching scores data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
