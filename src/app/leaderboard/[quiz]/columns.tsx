"use client";

import { LeaderboardEntry } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<LeaderboardEntry>[] = [
    {
        accessorKey: "status",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Quiz",
    },
    {
        accessorKey: "level",
        header: "Level",
    },
    {
        accessorKey: "score",
        header: "Score",
    },
    {
        accessorKey: "date",
        header: "Date Completed",
    },
];
