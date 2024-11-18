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

const frontEndLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "HTML & CSS Basics",
        date: "Week 1-2",
        description: "Learn the structure of web pages using HTML and style them with CSS.",
    },
    {
        id: 2,
        title: "JavaScript Fundamentals",
        date: "Week 3-5",
        description: "Understand the basics of JavaScript, including variables, functions, and control structures.",
    },
    {
        id: 3,
        title: "Version Control with Git",
        date: "Week 6",
        description: "Learn the basics of version control using Git to manage and collaborate on code projects.",
    },
    {
        id: 4,
        title: "Responsive Design",
        date: "Week 7-8",
        description: "Learn how to create web pages that look great on any device using CSS Flexbox and Grid.",
    },
    {
        id: 5,
        title: "JavaScript Advanced Topics",
        date: "Week 9-11",
        description: "Dive deeper into JavaScript with topics such as ES6+, asynchronous programming, and DOM manipulation.",
    },
    {
        id: 6,
        title: "Front-End Frameworks (React)",
        date: "Week 12-15",
        description: "Learn React to build dynamic and interactive web applications.",
    },
    {
        id: 7,
        title: "State Management",
        date: "Week 16-17",
        description: "Understand state management using tools like Redux or React's Context API.",
    },
    {
        id: 8,
        title: "APIs and Fetching Data",
        date: "Week 18-19",
        description: "Learn how to interact with APIs and handle data fetching and state management in your apps.",
    },
    {
        id: 9,
        title: "Web Accessibility (A11Y)",
        date: "Week 20",
        description: "Learn how to create accessible web applications that are usable by everyone.",
    },
    {
        id: 10,
        title: "Final Project",
        date: "Week 21-24",
        description: "Work on a comprehensive project that incorporates everything you've learned.",
    },
];

export const TimelineLayout = ( { items }: { items: TimelineElement[]; } ) => {
    return (
        <Timeline className="w-10/12 mx-auto p-6">
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
            <h1>Front-End Web Development Learning Path</h1>
            <TimelineLayout items={frontEndLearningPath} />
        </div>
    );
}
