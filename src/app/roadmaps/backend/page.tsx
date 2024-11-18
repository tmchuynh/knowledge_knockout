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

const backEndLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "Learn a Programming Language",
        date: "Week 1-4",
        description: "Start with a backend language such as Node.js (JavaScript), Python, Java, or Go.",
    },
    {
        id: 2,
        title: "Understand Version Control (Git)",
        date: "Week 5",
        description: "Learn the basics of version control using Git to manage and collaborate on code projects.",
    },
    {
        id: 3,
        title: "Web Server Basics",
        date: "Week 6-8",
        description: "Understand how web servers work. Build simple servers using Express.js, Flask, or Spring Boot.",
    },
    {
        id: 4,
        title: "Database Management",
        date: "Week 9-12",
        description: "Learn about relational databases (SQL) like PostgreSQL and MySQL, or NoSQL databases like MongoDB.",
    },
    {
        id: 5,
        title: "RESTful APIs",
        date: "Week 13-15",
        description: "Create and manage RESTful APIs for handling client-server communication.",
    },
    {
        id: 6,
        title: "Authentication and Authorization",
        date: "Week 16-17",
        description: "Implement user authentication and authorization using JWTs, OAuth, or other methods.",
    },
    {
        id: 7,
        title: "Advanced Backend Concepts",
        date: "Week 18-20",
        description: "Understand middleware, routing, error handling, and logging.",
    },
    {
        id: 8,
        title: "Deployment and DevOps Basics",
        date: "Week 21-22",
        description: "Learn how to deploy applications using cloud services like AWS, Heroku, or Docker.",
    },
    {
        id: 9,
        title: "Scalability and Performance",
        date: "Week 23",
        description: "Understand concepts like caching, load balancing, and scaling to improve performance.",
    },
    {
        id: 10,
        title: "Final Project",
        date: "Week 24-28",
        description: "Create a comprehensive backend application incorporating all learned concepts.",
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
            <h1>Backend Web Development Learning Path</h1>
            <TimelineLayout items={backEndLearningPath} />
        </div>
    );
}
