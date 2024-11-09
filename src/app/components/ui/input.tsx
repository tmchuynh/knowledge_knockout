import React from 'react';

interface InputProps {
    id: string;
    type: string;
    value?: string;
    name?: string;
    onChange?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    onKeyDown?: ( e: React.KeyboardEvent<HTMLInputElement> ) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ( {
    id,
    type,
    value = '',
    name,
    onChange,
    onKeyDown,
    placeholder = '',
    className = '',
    disabled = false,
} ) => {
    return (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${ className }`}
        />
    );
};

export default Input;
