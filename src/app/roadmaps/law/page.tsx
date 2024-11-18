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

const lawLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "Introduction to Legal Systems",
        date: "Year 1 - Semester 1",
        description: "Learn the basics of legal systems, including the structure of courts and the sources of law.",
    },
    {
        id: 2,
        title: "Constitutional Law",
        date: "Year 1 - Semester 2",
        description: "Study the principles and framework of constitutional law, focusing on civil rights and liberties.",
    },
    {
        id: 3,
        title: "Contract Law",
        date: "Year 2 - Semester 1",
        description: "Understand the formation, execution, and enforcement of contracts and related legal implications.",
    },
    {
        id: 4,
        title: "Torts and Personal Injury Law",
        date: "Year 2 - Semester 2",
        description: "Examine the legal implications of torts, including negligence, liability, and personal injury cases.",
    },
    {
        id: 5,
        title: "Criminal Law and Procedure",
        date: "Year 3 - Semester 1",
        description: "Learn about criminal offenses, defense mechanisms, and the procedural aspects of criminal law.",
    },
    {
        id: 6,
        title: "Property Law",
        date: "Year 3 - Semester 2",
        description: "Explore the legal concepts related to ownership, real estate, and property rights.",
    },
    {
        id: 7,
        title: "Administrative Law",
        date: "Year 4 - Semester 1",
        description: "Study the regulations and rules governing administrative agencies and their decision-making processes.",
    },
    {
        id: 8,
        title: "Ethics and Professional Responsibility",
        date: "Year 4 - Semester 2",
        description: "Understand the ethical considerations and professional responsibilities of practicing lawyers.",
    },
    {
        id: 9,
        title: "Internship or Clerkship",
        date: "Year 4 - Summer",
        description: "Gain practical experience by working under the supervision of a licensed attorney or judge.",
    },
    {
        id: 10,
        title: "Bar Exam Preparation",
        date: "Final Semester",
        description: "Prepare for the bar exam with intensive review courses and practice tests.",
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
            <h1>Law Learning Path</h1>
            <TimelineLayout items={lawLearningPath} />
        </div>
    );
}
