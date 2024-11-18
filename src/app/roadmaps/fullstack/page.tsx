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

const fullStackLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "HTML & CSS Fundamentals",
        date: "Week 1-2",
        description: "Learn the basics of structuring and styling web pages using HTML and CSS.",
    },
    {
        id: 2,
        title: "JavaScript Essentials",
        date: "Week 3-5",
        description: "Understand core JavaScript concepts, including variables, functions, and control structures.",
    },
    {
        id: 3,
        title: "Git and Version Control",
        date: "Week 6",
        description: "Learn how to use Git for version control and collaboration.",
    },
    {
        id: 4,
        title: "Front-End Framework (React)",
        date: "Week 7-10",
        description: "Build interactive user interfaces using React, including state management and component lifecycle.",
    },
    {
        id: 5,
        title: "Node.js and Express",
        date: "Week 11-13",
        description: "Learn server-side programming with Node.js and create RESTful APIs using Express.js.",
    },
    {
        id: 6,
        title: "Databases (SQL & NoSQL)",
        date: "Week 14-17",
        description: "Understand relational databases (e.g., PostgreSQL) and NoSQL databases (e.g., MongoDB).",
    },
    {
        id: 7,
        title: "Building Full-Stack Applications",
        date: "Week 18-20",
        description: "Integrate front-end and back-end development to create full-stack applications.",
    },
    {
        id: 8,
        title: "Authentication and Security",
        date: "Week 21-22",
        description: "Implement authentication and security best practices in full-stack applications.",
    },
    {
        id: 9,
        title: "Deployment and DevOps Basics",
        date: "Week 23-24",
        description: "Deploy full-stack applications using platforms like AWS, Heroku, or Docker.",
    },
    {
        id: 10,
        title: "Advanced Topics and Final Project",
        date: "Week 25-30",
        description: "Explore advanced topics like GraphQL, WebSockets, and complete a comprehensive full-stack project.",
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
            <h1>Full-Stack Web Development Learning Path</h1>
            <TimelineLayout items={fullStackLearningPath} />
        </div>
    );
}
