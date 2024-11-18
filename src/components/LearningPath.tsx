'use client';

import React from 'react';
import { Timeline, TimelineConnector, TimelineContent, TimelineDescription, TimelineHeader, TimelineIcon, TimelineItem, TimelineTime, TimelineTitle } from './ui/timeline';


interface LearningStep {
    id: number;
    title: string;
    description: string;
    date: string;
    icon?: React.ReactNode;
}

interface LearningPathProps {
    steps: LearningStep[];
    title?: string;
}

const LearningPath: React.FC<LearningPathProps> = ( { steps, title = 'Learning Path' } ) => {
    return (
        <div className="p-4 border rounded-md shadow-md w-full max-w-2xl mx-auto">
            <h2 className="text-center">{title}</h2>
            <Timeline className="relative">
                {steps.map( ( step, index ) => (
                    <TimelineItem key={step.id}>
                        <TimelineHeader>
                            <TimelineIcon className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                                {step.icon ? step.icon : <span className="text-white">✓</span>}
                            </TimelineIcon>
                            <TimelineTime>{step.date}</TimelineTime>
                        </TimelineHeader>
                        <TimelineConnector />
                        <TimelineContent>
                            <TimelineTitle>{step.title}</TimelineTitle>
                            <TimelineDescription>{step.description}</TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>
                ) )}
            </Timeline>
        </div>
    );
};

export default LearningPath;
