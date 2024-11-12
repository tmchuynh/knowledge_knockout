import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

interface ScoreData {
    DB_DATE: string; // 'YYYY-MM-DD' format
    WEEKDAYNO: number;
    WEEK_OF_MONTH: number;
    MONTHID: number;
    M_NAME: string;
    DAY_NAME_SHORT: string;
    score_count: number;
}

const ContributionHeatmap: React.FC = () => {
    const [scores, setScores] = useState<ScoreData[]>( [] );
    const containerRef = useRef<HTMLDivElement | null>( null );
    const box = 12; // Cell size

    useEffect( () => {
        const fetchScores = async () => {
            try {
                const response = await fetch( '/api/users/score/format' );
                if ( !response.ok ) {
                    throw new Error( 'Failed to fetch scores' );
                }
                const data = await response.json();
                const formattedData = data.map( ( item: ScoreData ) => ( {
                    ...item,
                } ) );
                setScores( formattedData );
            } catch ( error ) {
                console.error( 'Error fetching scores:', error );
            }
        };

        fetchScores();
    }, [] );

    useEffect( () => {
        if ( scores.length > 0 && containerRef.current ) {
            // Render the heatmap when scores are loaded
            renderHeatmap();
        }
    }, [scores] );

    const renderHeatmap = () => {
        if ( !containerRef.current ) return;

        // Clear existing content
        d3.select( containerRef.current ).selectAll( '*' ).remove();

        const colorScale = d3.scaleQuantize<string>()
            .domain( [0, d3.max( scores, d => d.score_count ) || 1] )
            .range( ['#e0f7fa', '#80deea', '#26c6da', '#00acc1', '#00838f'] );

        const svg = d3.select( containerRef.current )
            .append( 'svg' )
            .attr( 'width', scores.length * 80 + 60 )
            .attr( 'height', box * 7 + 80 )
            .classed( 'svg-area', true );

        const ctr = svg.append( 'g' )
            .attr( 'transform', `translate(10,10)` );

        const heatMapCtr = ctr.append( 'g' )
            .attr( 'transform', 'translate(50,30)' );

        // Render month labels and heatmap
        const months = d3.groups( scores, d => d.MONTHID );
        const months_name = d3.groups( scores, d => d.M_NAME );
        for ( let j = 0; j < months.length; j++ ) {
            heatMapCtr.append( 'g' )
                .attr( 'transform', `translate(${ j * ( box * 6 + 20 ) }, 10)` )
                .append( 'text' )
                .attr( 'x', 0 )
                .classed( 'heatMapMonths-labels', true )
                .text( months_name[j][0] );

            heatMapCtr.append( 'g' )
                .attr( 'transform', `translate(${ j * ( box * 6 + 20 ) }, 20)` )
                .selectAll( 'rect' )
                .data( months[j][1] )
                .join( 'rect' )
                .attr( 'width', box )
                .attr( 'height', box )
                .attr( 'y', d => ( box + 1 ) * ( d.WEEKDAYNO % 7 ) )
                .attr( 'x', d => ( box + 1 ) * d.WEEK_OF_MONTH )
                .attr( 'fill', d => colorScale( d.score_count ) )
                .on( 'mouseenter', function ( event, d ) {
                    d3.select( this ).attr( 'stroke', 'black' ).attr( 'stroke-width', 2 );
                    const tooltip = d3.select( '#tooltip' );
                    tooltip.style( 'visibility', 'visible' )
                        .text( `Date: ${ d.DB_DATE }, Scores: ${ d.score_count }` )
                        .style( 'top', `${ event.clientY + 5 }px` )
                        .style( 'left', `${ event.clientX + 5 }px` );
                } )
                .on( 'mouseleave', function () {
                    d3.select( this ).attr( 'stroke-width', 0 );
                    d3.select( '#tooltip' ).style( 'visibility', 'hidden' );
                } );
        }
    };

    return (
        <div>
            <div ref={containerRef}></div>
            <div id="tooltip" style={{ position: 'absolute', visibility: 'hidden', background: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}></div>
        </div>
    );
};

export default ContributionHeatmap;
