import { createPopper } from '@popperjs/core';

/**
 * Initializes a popover for displaying password requirements.
 *
 * @param {HTMLElement} passwordInput - The input element for the password field.
 *
 * @returns {void}
 */
export function initializePasswordPopover( passwordInput: HTMLElement ): void {
    const popover = document.getElementById( "popover-password" ) as HTMLElement;

    // Initialize Popper.js
    const popperInstance = createPopper( passwordInput, popover, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
        ],
    } );

    // Show popover when password field is focused
    passwordInput.addEventListener( "focus", () => {
        popover.classList.remove( "invisible", "opacity-0" );
        popover.classList.add( "visible", "opacity-100" );
        popperInstance.update();
    } );

    // Hide popover when password field loses focus
    passwordInput.addEventListener( "blur", () => {
        popover.classList.remove( "visible", "opacity-100" );
        popover.classList.add( "invisible", "opacity-0" );
    } );
}