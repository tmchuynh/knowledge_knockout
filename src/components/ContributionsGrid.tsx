'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Score, User } from '@/types/interface';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ContributionCell {
    date: string;
    scoreCount: number;
}

const ContributionGrid: React.FC = () => {
    const [data, setData] = useState<ContributionCell[]>( [] );
    const [user, setUser] = useState<User>();

    useEffect( () => {
        const fetchUser = async () => {
            try {
                const response = await fetch( "/api/auth/me", {
                    credentials: "include",
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch user, status: ${ response.status }` );
                }

                const data = await response.json();
                setUser( data );
                fetchData( data );
            } catch ( error ) {
                console.error( "Error fetching user:", error );
            }
        };

        const fetchData = async ( user: User ) => {
            try {
                const response = await fetch( `/api/score/username/${ user?.username }`, {
                    credentials: 'include',
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch scores. Status: ${ response.status }` );
                }

                const scores: Score[] = await response.json();
                const formattedData: ContributionCell[] = formatData( scores );

                setData( formattedData );
            } catch ( error ) {
                console.error( 'Error fetching scores:', error );
            }
        };

        fetchUser();
    }, [] );

    const formatData = ( scores: Score[] ): ContributionCell[] => {
        const dateMap: { [key: string]: number; } = {};

        scores.forEach( ( score ) => {
            if ( score.created_at ) {
                const date = d3.timeFormat( '%Y-%m-%d' )( new Date( score.created_at ) );
                dateMap[date] = ( dateMap[date] || 0 ) + 1;
            }
        } );

        return Object.entries( dateMap ).map( ( [date, count] ) => ( {
            date,
            scoreCount: count,
        } ) );
    };

    const renderGrid = () => {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear( oneYearAgo.getFullYear() - 1 );

        const days = d3.timeDays( oneYearAgo, new Date() );
        const maxScoreCount = d3.max( data, ( d ) => d.scoreCount ) || 0;
        const colorScale = d3.scaleLinear<string>()
            .domain( [0, maxScoreCount] )
            .range( ['#ebedf0', '#216e39'] );

        return days.map( ( day, index ) => {
            const dayString = d3.timeFormat( '%Y-%m-%d' )( day );
            const cellData = data.find( ( d ) => d.date === dayString );
            const fill = cellData ? colorScale( cellData.scoreCount ) : '#ebedf0';

            return (
                <TooltipProvider key={index}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <g transform={`translate(${ ( index % 53 ) * 16 }, ${ Math.floor( index / 53 ) * 16 })`} className='m-12'>
                                <rect
                                    width={12}
                                    height={12}
                                    fill={fill}
                                    stroke="#ddd"
                                    className="cursor-pointer"
                                    rx={3} // Rounded corners for each cell
                                    ry={3} // Rounded corners for each cell
                                />
                            </g>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>{`${ dayString }: ${ cellData ? cellData.scoreCount : 0 } scores`}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        } );
    };

    return (
        <svg className="contribution-grid w-full mx-auto">
            <g transform="translate(40, 40)">
                {renderGrid()}
            </g>
        </svg>
    );
};

export default ContributionGrid;
