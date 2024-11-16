'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ToDoItem {
    id: number;
    label: string;
    completed: boolean;
}

const ToDoList: React.FC = () => {
    const [items, setItems] = useState<ToDoItem[]>( [] );
    const [newItem, setNewItem] = useState<string>( '' );

    const addItem = () => {
        if ( newItem.trim() ) {
            const newTask = {
                id: items.length ? items[items.length - 1].id + 1 : 1,
                label: newItem.trim(),
                completed: false,
            };
            setItems( [...items, newTask] );
            setNewItem( '' );
        }
    };

    const toggleCompletion = ( id: number ) => {
        setItems( prevItems =>
            prevItems.map( item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const deleteItem = ( id: number ) => {
        setItems( prevItems => prevItems.filter( item => item.id !== id ) );
    };

    return (
        <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">To-Do List</h2>
            <div className="flex mb-4">
                <Input
                    type="text"
                    placeholder="Add a new task..."
                    value={newItem}
                    onChange={( e ) => setNewItem( e.target.value )}
                    className="flex-grow mr-2"
                />
                <Button onClick={addItem} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Add
                </Button>
            </div>
            {items.length > 0 ? (
                <ul>
                    {items.map( item => (
                        <li
                            key={item.id}
                            className={`flex items-center justify-between mb-2 p-2 border rounded-md ${ item.completed ? 'bg-green-100 line-through' : 'bg-white'
                                }`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleCompletion( item.id )}
                                    className="mr-2"
                                />
                                <span>{item.label}</span>
                            </div>
                            <Button
                                onClick={() => deleteItem( item.id )}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </Button>
                        </li>
                    ) )}
                </ul>
            ) : (
                <p className="text-gray-500">No tasks added yet.</p>
            )}
        </div>
    );
};

export default ToDoList;
