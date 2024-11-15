// components/ContributionsGrid.tsx
import React, { useEffect } from 'react';
import { formatDate } from '../utils/formatUtils';

interface ContributionsGridProps {
    baseColor: string;
}

const ContributionsGrid: React.FC<ContributionsGridProps> = ( { baseColor } ) => {
    useEffect( () => {
        createContributionGrid( baseColor );
    }, [baseColor] );

    return (
        <>
            <div id="contributionGrid" className="grid grid-cols-4 m-auto p-5 col-span justify-items-center"></div>
        </>
    );
};

// Function to create the contribution grid
export const createContributionGrid = ( baseColor: string ) => {
    const gridContainer = document.getElementById( 'contributionGrid' );
    if ( !gridContainer ) return;

    const shades = generateColorShades( baseColor, 5 );
    gridContainer.innerHTML = ''; // Clear previous grid
    const currentDate = new Date(); // Get the current date
    currentDate.setDate( currentDate.getDate() + 7 );

    // Create a map to hold months and their respective weeks
    const months: { [key: string]: HTMLElement; } = {};
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for ( let i = 0; i < 365; i++ ) {
        const dateForCell = new Date( currentDate );
        dateForCell.setDate( currentDate.getDate() - ( 364 - i ) ); // Calculate date
        const dateString = formatDate( dateForCell ); // Format: mm/dd/yyyy

        // Calculate month-year key for grouping
        const monthYear = `${ dateForCell.getFullYear() }-${ dateForCell.getMonth() + 1 }`;

        const cell = document.createElement( 'div' );
        cell.classList.add(
            'w-4', 'h-4', 'm-1', 'aspect-square', 'rounded',
            'transition-transform', 'duration-200', 'ease-in-out', 'transform'
        );
        const level = Math.floor( Math.random() * shades.length );
        cell.style.backgroundColor = level > 0 ? shades[level] : '#e0e0e0'; // Use appropriate shade or default color
        cell.classList.add( `date-${ dateString }`, `level-${ level }` );
        cell.addEventListener( 'mouseenter', () => showPopover( cell, level ) );
        cell.addEventListener( 'mouseleave', hidePopover );

        // Check if the month container already exists
        if ( !months[monthYear] ) {
            const monthContainer = document.createElement( 'div' );
            monthContainer.classList.add( 'month-container', 'flex', 'flex-col', 'm-5', 'align-center' );
            const monthTitle = document.createElement( 'h3' );
            monthTitle.classList.add( 'text-lg', 'font-bold', 'mb-2', 'dark:text-white', 'text-center' );
            monthTitle.textContent = `${ monthNames[dateForCell.getMonth()] } ${ dateForCell.getFullYear() }`;
            monthContainer.appendChild( monthTitle );

            const weekContainer = document.createElement( 'div' );
            weekContainer.classList.add( 'week-container', 'flex', 'flex-col' );
            monthContainer.appendChild( weekContainer );
            months[monthYear] = monthContainer;
            gridContainer.appendChild( monthContainer );
        }

        const weekContainer = months[monthYear].querySelector( '.week-container' );
        const currentWeekNumber = getDateWeek( dateForCell );
        let weekDiv = weekContainer?.querySelector( `.week-${ currentWeekNumber }` );
        if ( !weekDiv ) {
            weekDiv = document.createElement( 'div' );
            weekDiv.classList.add( 'week', `week-${ currentWeekNumber }`, 'flex', 'flex-row' );
            weekContainer?.appendChild( weekDiv );
        }
        weekDiv.appendChild( cell );
    }
};

export function getDateWeek( date: Date | undefined ): number {
    const currentDate = date instanceof Date ? date : new Date();
    const januaryFirst = new Date( currentDate.getFullYear(), 0, 1 );
    const daysToNextMonday = januaryFirst.getDay() === 1 ? 0 : ( 7 - januaryFirst.getDay() ) % 7;
    const nextMonday = new Date( currentDate.getFullYear(), 0, januaryFirst.getDate() + daysToNextMonday );
    return currentDate < nextMonday ? 52 : Math.ceil( ( currentDate.getTime() - nextMonday.getTime() ) / ( 24 * 3600 * 1000 ) / 7 );
}

const showPopover = ( cell: HTMLElement, level: number ) => {
    const popover = document.createElement( 'div' );
    popover.className = 'popover';
    popover.textContent = `${ level } contributions`;
    document.body.appendChild( popover );

    cell.addEventListener( 'mousemove', ( event ) => {
        popover.style.top = `${ event.clientY + 10 }px`;
        popover.style.left = `${ event.clientX + 10 }px`;
    } );
};

const hidePopover = () => {
    document.querySelectorAll( '.popover' ).forEach( ( popover ) => popover.remove() );
};

const generateColorShades = ( baseColor: string, levels: number ): string[] => {
    const rgb = hexToRgb( baseColor );
    const { c, m, y, k } = rgbToCmyk( rgb.r, rgb.g, rgb.b );
    const shades: string[] = [];

    const maxLevels = 20;
    const adjustmentFactor = levels < maxLevels ? ( maxLevels - levels ) / maxLevels : 0;

    for ( let i = 0; i < levels; i++ ) {
        const factor = i / ( levels + 1 );
        const newK = Math.min( k + factor * ( 0.5 + adjustmentFactor ), 1.5 );
        const newC = Math.max( c - factor * ( 1.5 - adjustmentFactor ), 0 );
        const newM = Math.max( m - factor * ( 0.5 - adjustmentFactor ), 0 );
        const newY = Math.max( y - factor * ( 1.5 - adjustmentFactor ), 0 );
        const { r, g, b } = cmykToRgb( newC, newM, newY, newK );
        shades.push( rgbToHex( r, g, b ) );
    }

    return shades;
};

const hexToRgb = ( hex: string ): { r: number; g: number; b: number; } => {
    const bigint = parseInt( hex.slice( 1 ), 16 );
    return { r: ( bigint >> 16 ) & 255, g: ( bigint >> 8 ) & 255, b: bigint & 255 };
};

const rgbToHex = ( r: number, g: number, b: number ): string => {
    const hex = ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 );
    return `#${ hex }`;
};

const rgbToCmyk = ( r: number, g: number, b: number ): { c: number; m: number; y: number; k: number; } => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const k = 1 - Math.max( rNorm, gNorm, bNorm );
    const c = ( 1 - rNorm - k ) / ( 1 - k ) || 0;
    const m = ( 1 - gNorm - k ) / ( 1 - k ) || 0;
    const y = ( 1 - bNorm - k ) / ( 1 - k ) || 0;

    return { c, m, y, k };
};

const cmykToRgb = ( c: number, m: number, y: number, k: number ): { r: number; g: number; b: number; } => {
    const r = Math.round( 255 * ( 1 - c ) * ( 1 - k ) );
    const g = Math.round( 255 * ( 1 - m ) * ( 1 - k ) );
    const b = Math.round( 255 * ( 1 - y ) * ( 1 - k ) );
    return { r, g, b };
};

export default ContributionsGrid;