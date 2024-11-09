import React from 'react';

interface ButtonProps {
    key?: number;
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ( { key, label, onClick, className = '', disabled = false } ) => {
    return (
        <button
            key={key}
            className={`button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center ${ className }`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
