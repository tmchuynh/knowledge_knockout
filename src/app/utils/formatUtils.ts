/**
 * Formats a date string to the hh:mm AM/PM format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in hh:mm AM/PM format.
 */
export function formatTime( dateString: Date ): string {
    const date = new Date( dateString ); // Convert the string to a Date object
    let hours = date.getHours(); // Get hours from 0 to 23
    const minutes = date.getMinutes().toString().padStart( 2, "0" ); // Get minutes and pad with leading zero if necessary
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM

    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // Adjust midnight hour from 0 to 12
    const formattedHours = hours.toString().padStart( 2, "0" ); // Pad hours with leading zero if necessary

    return `${ formattedHours }:${ minutes } ${ ampm }`; // Return in hh:mm AM/PM format
}

/**
 * Formats a date string to the mm/dd/yy format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in mm/dd/yy format.
 */
export function formatDate( dateString: Date ): string {
    const date = new Date( dateString ); // Convert the string to a Date object
    const month = ( date.getMonth() + 1 ).toString().padStart( 2, "0" ); // getMonth() returns 0-11, so add 1
    const day = date.getDate().toString().padStart( 2, "0" ); // Add leading 0 if necessary
    const year = date.getFullYear().toString().slice( -2 ); // Get last 2 digits of the year (yy)

    return `${ month }/${ day }/${ year }`; // Return in mm/dd/yy format
}