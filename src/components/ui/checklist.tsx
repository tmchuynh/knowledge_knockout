'use client';

import React, { useState } from 'react';

interface ChecklistItem {
    id: number;
    label: string;
    completed: boolean;
}

interface ChecklistProps {
    initialItems: ChecklistItem[];
    title?: string;
    onCompletionChange?: ( id: number, completed: boolean ) => void;
}

const Checklist: React.FC<ChecklistProps> = ( { initialItems, title = "Checklist", onCompletionChange } ) => {
    const [items, setItems] = useState<ChecklistItem[]>( initialItems );

    const toggleCompletion = ( id: number ) => {
        setItems( prevItems =>
            prevItems.map( item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );

        const updatedItem = items.find( item => item.id === id );
        if ( updatedItem && onCompletionChange ) {
            onCompletionChange( id, !updatedItem.completed );
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
            <h2 className="text-center">{title}</h2>
            <ul>
                {items.map( item => (
                    <li
                        key={item.id}
                        className={`flex items-center mb-2 p-2 border rounded-md cursor-pointer ${ item.completed ? 'bg-green-100 line-through' : 'bg-white'
                            }`}
                        onClick={() => toggleCompletion( item.id )}
                    >
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleCompletion( item.id )}
                            className="mr-2"
                        />
                        <span>{item.label}</span>
                    </li>
                ) )}
            </ul>
        </div>
    );
};

export default Checklist;
