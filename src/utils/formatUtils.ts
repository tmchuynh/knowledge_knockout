/**
 * Formats a date string to the hh:mm AM/PM format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in hh:mm AM/PM format.
 */
export function formatTime( dateString: Date ): string {
    const date = new Date( dateString );
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart( 2, "0" );
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart( 2, "0" );

    return `${ formattedHours }:${ minutes } ${ ampm }`;
}

/**
 * Formats a date string to the mm/dd/yy format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in mm/dd/yy format.
 */
export function formatDate( dateString: Date ): string {
    const date = new Date( dateString );
    const year = date.getFullYear();
    const month = ( date.getMonth() + 1 ).toString().padStart( 2, "0" );
    const day = date.getDate().toString().padStart( 2, "0" );

    return `${ year }-${ month }-${ day }`;
}

export function toTitleCase( str: string ): string {
    str = str.trim();

    return str.replace(
        /\w\S*/g,
        ( text ) => text.charAt( 0 ).toUpperCase() + text.substring( 1 ).toLowerCase()
    );
}

export function formatTimelapsed( timelapsed: string ): string {
    // Ensure the input is already in HH:MM:SS format
    if ( !timelapsed.match( /^\d{2}:\d{2}:\d{2}$/ ) ) {
        throw new Error( 'Invalid TIME format. Expected format: HH:MM:SS' );
    }

    const [hours, minutes, seconds] = timelapsed.split( ':' ).map( Number );

    // Pad values to ensure two digits if needed
    const paddedHours = String( hours ).padStart( 2, '0' );
    const paddedMinutes = String( minutes ).padStart( 2, '0' );
    const paddedSeconds = String( seconds ).padStart( 2, '0' );

    return `${ paddedHours }:${ paddedMinutes }:${ paddedSeconds }`;
}
