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

const preMedLearningPath: TimelineElement[] = [
    {
        id: 1,
        title: "Introduction to Biology and Chemistry",
        date: "Year 1 - Semester 1",
        description: "Start with foundational courses in biology and general chemistry to build a strong base.",
    },
    {
        id: 2,
        title: "Advanced Biology and Organic Chemistry",
        date: "Year 1 - Semester 2",
        description: "Deepen your understanding with courses in cell biology, genetics, and organic chemistry.",
    },
    {
        id: 3,
        title: "Physics and Biochemistry",
        date: "Year 2 - Semester 1",
        description: "Study physics concepts relevant to the medical field and biochemistry for a deeper understanding of metabolic processes.",
    },
    {
        id: 4,
        title: "Human Anatomy and Physiology",
        date: "Year 2 - Semester 2",
        description: "Learn the structure and function of the human body with detailed anatomy and physiology courses.",
    },
    {
        id: 5,
        title: "Research and Clinical Experience",
        date: "Year 2 - Summer",
        description: "Gain practical experience through clinical shadowing, volunteer work, or lab research.",
    },
    {
        id: 6,
        title: "Preparation for the MCAT",
        date: "Year 3 - Semester 1",
        description: "Begin MCAT preparation by reviewing content and taking practice exams to identify areas for improvement.",
    },
    {
        id: 7,
        title: "MCAT Exam and Application Preparation",
        date: "Year 3 - Semester 2",
        description: "Take the MCAT exam and start preparing your medical school applications, including personal statements and gathering recommendation letters.",
    },
    {
        id: 8,
        title: "Advanced Medical Topics and Ethics",
        date: "Year 4 - Semester 1",
        description: "Enroll in courses like medical ethics, pathology, and advanced physiology to strengthen your medical knowledge.",
    },
    {
        id: 9,
        title: "Application Submissions and Interviews",
        date: "Year 4 - Semester 2",
        description: "Submit medical school applications and participate in interviews as you await responses.",
    },
    {
        id: 10,
        title: "Graduation and Transition to Medical School",
        date: "End of Year 4",
        description: "Prepare for medical school by transitioning your academic focus and engaging in pre-matriculation programs if available.",
    },
];

export const TimelineLayout = ( { items }: { items: TimelineElement[]; } ) => {
    return (
        <Timeline className="w-10/12 mx-auto p-6">
            {items.map( ( item ) => (
                <TimelineItem key={item.id}>
                    <TimelineConnector />
                    <TimelineHeader>
                        <TimelineTime className="w-12 text-center leading-1">{item.date}</TimelineTime>
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
            <h1>Pre-Medical Learning Path</h1>
            <TimelineLayout items={preMedLearningPath} />
        </div>
    );
}
