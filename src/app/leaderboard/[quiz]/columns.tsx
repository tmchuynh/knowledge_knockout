"use client";

import { LeaderboardEntry } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<LeaderboardEntry>[] = [
    {
        accessorKey: "level",
        header: "Level",
    },
    {
        accessorKey: "date",
        header: "Date Completed",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "score",
        header: "Score",
    },
    {
        accessorKey: "timelapsed",
        header: "Time",
    },
];
