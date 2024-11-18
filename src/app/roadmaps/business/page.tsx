"use client";

import React from "react";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineTitle,
    TimelineIcon,
    TimelineDescription,
    TimelineContent,
    TimelineTime,
} from "@/components/ui/timeline";

interface TimelineElement {
    id: number;
    title: string;
    date: string;
    description: string;
}

const businessLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "Introduction to Business Principles",
        date: "Semester 1",
        description: "Gain an overview of basic business concepts such as management, marketing, and operations.",
    },
    {
        id: 2,
        title: "Accounting and Financial Basics",
        date: "Semester 2",
        description: "Learn the fundamentals of accounting, financial reporting, and budgeting.",
    },
    {
        id: 3,
        title: "Marketing Fundamentals",
        date: "Semester 3",
        description: "Understand marketing strategies, consumer behavior, and market research methods.",
    },
    {
        id: 4,
        title: "Microeconomics and Macroeconomics",
        date: "Semester 4",
        description: "Study the principles of microeconomics and macroeconomics to understand market dynamics and economic policies.",
    },
    {
        id: 5,
        title: "Business Law and Ethics",
        date: "Semester 5",
        description: "Learn the legal framework within which businesses operate and study business ethics for responsible decision-making.",
    },
    {
        id: 6,
        title: "Management and Leadership",
        date: "Semester 6",
        description: "Develop skills in organizational leadership, team management, and strategic planning.",
    },
    {
        id: 7,
        title: "Entrepreneurship",
        date: "Semester 7",
        description: "Explore entrepreneurship, including business plan development and startup strategies.",
    },
    {
        id: 8,
        title: "Finance and Investment Analysis",
        date: "Semester 8",
        description: "Learn about financial markets, investment strategies, and risk management.",
    },
    {
        id: 9,
        title: "Internship and Real-World Experience",
        date: "Summer",
        description: "Participate in an internship to gain hands-on business experience and build professional connections.",
    },
    {
        id: 10,
        title: "Capstone Project",
        date: "Final Semester",
        description: "Apply all learned concepts in a comprehensive project that simulates real-world business challenges.",
    },
];

export const TimelineLayout = ( { items }: { items: TimelineElement[]; } ) => {
    return (
        <Timeline>
            {items.map( ( item ) => (
                <TimelineItem key={item.id}>
                    <TimelineConnector />
                    <TimelineHeader>
                        <TimelineTime>{item.date}</TimelineTime>
                        <TimelineIcon />
                        <TimelineTitle>{item.title}</TimelineTitle>
                    </TimelineHeader>
                    <TimelineContent>
                        <TimelineDescription>{item.description}</TimelineDescription>
                    </TimelineContent>
                </TimelineItem>
            ) )}
        </Timeline>
    );
};

export default function Page() {
    return (
        <div className="container mx-auto w-11/12 p-6 rounded-lg shadow-md border hover:shadow-md">
            <h1>Business Learning Path</h1>
            <TimelineLayout items={businessLearningPath} />
        </div>
    );
}
