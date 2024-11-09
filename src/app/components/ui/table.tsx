// Table.tsx
import React from 'react';

interface TableProps {
    headers: string[];
    data: { username: string, quiz: string, level: number, score: number, date_completed: string; }[];
    renderRow: ( row: { username: string, quiz: string, level: number, score: number, date_completed: string; }, index: number ) => JSX.Element;
}

const Table: React.FC<TableProps> = ( { headers, data, renderRow } ) => {
    return (
        <table className="w-full text-left bg-gray-700 rounded-lg">
            <thead>
                <tr>
                    {headers.map( ( header, index ) => (
                        <th key={index} className="px-4 py-2">{header}</th>
                    ) )}
                </tr>
            </thead>
            <tbody>
                {data.map( ( row, index ) => renderRow( row, index ) )}
            </tbody>
        </table>
    );
};

export default Table;
