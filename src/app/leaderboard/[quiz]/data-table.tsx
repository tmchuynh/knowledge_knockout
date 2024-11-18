"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { LeaderboardEntry } from "@/types/interface";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    quiz: LeaderboardEntry[];
}

export function DataTable<TData, TValue>( { columns, data, quiz }: DataTableProps<TData, TValue> ) {
    console.log( "Quiz prop:", quiz );

    const quizNameStr = quiz.length > 0 ? quiz[0].quiz_subject : "N/A";
    const quizId = quiz.length > 0 ? quiz[0].quiz_id : null;

    const [leaderboard, setLeaderboard] = useState<Map<number, LeaderboardEntry[]> | null>( null );

    useEffect( () => {
        const fetchLeaderboard = async () => {
            if ( !quizId ) {
                console.error( "Quiz ID is missing. Skipping fetch." );
                return;
            }

            try {
                const leaderboardDataByLevel = await getLeaderboardDataByLevel( quizNameStr, quizId );
                console.log( "Leaderboard data by level:", leaderboardDataByLevel );
                setLeaderboard( leaderboardDataByLevel );
            } catch ( error ) {
                console.error( "Error during fetchLeaderboard:", error );
            }
        };

        if ( quizId ) {
            fetchLeaderboard();
        } else {
            console.error( "Quiz data is missing. Skipping fetch." );
        }
    }, [quizId, quizNameStr] );

    const table = useReactTable( {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    } );

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map( ( headerGroup ) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map( ( header ) => (
                                    <TableHead key={header.id} className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ) )}
                            </TableRow>
                        ) )}
                    </TableHeader>
                    <TableBody className="text-center">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map( ( row ) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map( ( cell, index ) => (
                                        <TableCell key={`${ cell.id }__${ index }`}>
                                            {flexRender( cell.column.columnDef.cell, cell.getContext() )}
                                        </TableCell>
                                    ) )}
                                </TableRow>
                            ) )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

const getLeaderboardDataByLevel = async ( quizName: string, id: string ): Promise<Map<number, LeaderboardEntry[]>> => {
    const leaderboardDataByLevel = new Map<number, LeaderboardEntry[]>();
    try {
        console.log( "Fetching leaderboard data for quiz:", quizName, "with ID:", id );

        const response = await fetch( `/api/leaderboard/${ quizName }` );
        if ( !response.ok ) {
            console.error( "Failed to fetch leaderboard data:", response.statusText );
            throw new Error( "Failed to fetch leaderboard data" );
        }

        const leaderboardData: LeaderboardEntry[] = await response.json();
        console.log( "Raw leaderboard data:", leaderboardData );

        leaderboardData.forEach( ( entry ) => {
            if ( !leaderboardDataByLevel.has( entry.level ) ) {
                leaderboardDataByLevel.set( entry.level, [] );
            }
            leaderboardDataByLevel.get( entry.level )!.push( entry );
        } );

        leaderboardDataByLevel.forEach( ( entries ) => entries.sort( ( a, b ) => b.score - a.score ) );
    } catch ( error ) {
        console.error( "Error fetching leaderboard data:", error );
    }

    return leaderboardDataByLevel;
};
