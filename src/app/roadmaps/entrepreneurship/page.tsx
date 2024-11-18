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

const entrepreneurshipLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "Introduction to Entrepreneurship",
        date: "Month 1",
        description: "Understand the basics of entrepreneurship, including traits of successful entrepreneurs and the startup ecosystem.",
    },
    {
        id: 2,
        title: "Market Research and Idea Validation",
        date: "Month 2",
        description: "Learn how to conduct market research, validate your business ideas, and identify your target audience.",
    },
    {
        id: 3,
        title: "Creating a Business Plan",
        date: "Month 3",
        description: "Develop a comprehensive business plan that includes your business model, target market, and financial projections.",
    },
    {
        id: 4,
        title: "Building a Minimum Viable Product (MVP)",
        date: "Month 4-5",
        description: "Learn how to create an MVP to test your idea in the market with minimal investment.",
    },
    {
        id: 5,
        title: "Funding Your Startup",
        date: "Month 6",
        description: "Explore different funding options such as bootstrapping, angel investors, venture capital, and crowdfunding.",
    },
    {
        id: 6,
        title: "Product Development and Iteration",
        date: "Month 7-8",
        description: "Develop your product based on feedback and iterate to improve its features and user experience.",
    },
    {
        id: 7,
        title: "Marketing and Branding",
        date: "Month 9",
        description: "Learn how to create a strong brand presence and implement marketing strategies to reach your target customers.",
    },
    {
        id: 8,
        title: "Sales Strategies and Customer Acquisition",
        date: "Month 10",
        description: "Develop effective sales strategies to acquire and retain customers.",
    },
    {
        id: 9,
        title: "Business Operations and Scaling",
        date: "Month 11",
        description: "Understand how to manage business operations efficiently and plan for scaling your business.",
    },
    {
        id: 10,
        title: "Leadership and Team Building",
        date: "Month 12",
        description: "Learn the skills necessary for leading a team, fostering a positive culture, and managing employee growth.",
    },
    {
        id: 11,
        title: "Final Pitch and Networking",
        date: "Month 13",
        description: "Prepare for pitching to investors and network with industry professionals to grow your business connections.",
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
            <h1>Entrepreneurship Learning Path</h1>
            <TimelineLayout items={entrepreneurshipLearningPath} />
        </div>
    );
}
