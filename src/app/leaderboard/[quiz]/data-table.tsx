"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { LeaderboardEntry } from "@/types";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    quiz: string;
}

export function DataTable<TData, TValue>( {
    columns,
    data,
    quiz,
}: DataTableProps<TData, TValue> ) {
    const { quizName } = useParams();
    const quizNameStr = Array.isArray( quiz ) ? quiz[0] : quiz!;
    const [leaderboard, setLeaderboard] = useState<Map<number, LeaderboardEntry[]> | null>( null );


    const transformRowData = ( entry: LeaderboardEntry, _index: number ) => ( {
        username: entry.username,
        quiz: quiz,
        level: entry.level,
        score: entry.score,
        date_completed: entry.date_completed.toDateString(),
    } );


    useEffect( () => {
        console.log( 'Quiz Name from useParams:', quiz );

        const fetchLeaderboard = async () => {
            try {
                const leaderboardDataByLevel = await getLeaderboardDataByLevel( quizNameStr );
                console.log( 'Fetched leaderboard data:', leaderboardDataByLevel );
                setLeaderboard( leaderboardDataByLevel );
            } catch ( error ) {
                console.error( 'Error during fetchLeaderboard:', error );
            }
        };


        if ( quiz ) {
            fetchLeaderboard();
        } else {
            console.error( 'Quiz name is missing. Skipping fetch.' );
        }
    }, [quiz] );

    const table = useReactTable( {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    } );

    return (
        <>
            <h3 className="text-2xl mb-3">Level </h3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map( ( headerGroup ) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map( ( header ) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                } )}
                            </TableRow>
                        ) )}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map( ( row ) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map( ( cell ) => (
                                        <TableCell key={cell.id}>
                                            {flexRender( cell.column.columnDef.cell, cell.getContext() )}
                                        </TableCell>
                                    ) )}
                                </TableRow>
                            ) )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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

const getLeaderboardDataByLevel = async ( quizName: string ): Promise<Map<number, LeaderboardEntry[]>> => {
    console.log( 'Fetching leaderboard for quiz:', quizName );



    const leaderboardDataByLevel = new Map<number, LeaderboardEntry[]>();
    try {
        const response = await fetch( `/api/leaderboard/${ quizName }` );
        console.log( 'API response status:', response.status );

        if ( !response.ok ) {
            console.error( 'Failed to fetch leaderboard data: ', response.statusText );
            throw new Error( 'Failed to fetch leaderboard data' );
        }

        const leaderboardData: LeaderboardEntry[] = await response.json();
        console.log( 'Raw leaderboard data:', leaderboardData );

        leaderboardData.forEach( ( entry ) => {
            if ( !leaderboardDataByLevel.has( entry.level ) ) {
                leaderboardDataByLevel.set( entry.level, [] );
            }
            leaderboardDataByLevel.get( entry.level )!.push( entry );
        } );

        leaderboardDataByLevel.forEach( ( entries ) => entries.sort( ( a, b ) => b.score - a.score ) );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
    }

    return leaderboardDataByLevel;
};