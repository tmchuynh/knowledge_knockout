"use client";

import * as React from "react";
import {
    BookCheck,
    BookOpen,
    Brain,
    Calendar1,
    CalendarRange,
    ChartNoAxesCombined,
    ChartSpline,
    CheckCheck,
    Cog,
    Command,
    FileChartColumnIncreasing,
    FolderClock,
    Gift,
    GraduationCap,
    LibraryBig,
    Medal,
    NotebookPen,
    Rocket,
    Send,
    Swords,
    Table2,
    TableProperties,
    TrendingUp,
    UserPen,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/NavMain";
import { NavDropdown } from "@/components/sidebar/NavDropdown";
import { NavSecondary } from "@/components/sidebar/NavSecondary";
import { NavUser } from "@/components/sidebar/NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
    navMain: [
        {
            title: "Flashcards",
            url: "#",
            icon: NotebookPen,
        },
        {
            title: "Quizzes",
            url: "/quiz",
            icon: CheckCheck,
            items: [
                {
                    title: "Software Engineering",
                    url: "#",
                },
                {
                    title: "Pre Medical",
                    url: "#",
                },
                {
                    title: "Business",
                    url: "#",
                },
                {
                    title: "Law",
                    url: "#",
                },
                {
                    title: "Entrepreneurship",
                    url: "#",
                },
                {
                    title: "Miscellaneous",
                    url: "#",
                },
            ],
        },
        {
            title: "Tests",
            url: "#",
            icon: BookCheck,
            items: [
                {
                    title: "Beginner Tests",
                    url: "#",
                },
                {
                    title: "Expert Tests",
                    url: "#",
                },
                {
                    title: "Multiple Subject Tests",
                    url: "#",
                },
                {
                    title: "Timed Tests",
                    url: "#",
                },
            ],
        },
        {
            title: "Learning Paths",
            url: "#",
            icon: NotebookPen,
            items: [
                {
                    title: "Full-Stack Web Development",
                    url: "/roadmaps/fullstack",
                },
                {
                    title: "Front-end Development",
                    url: "/roadmaps/frontend",
                },
                {
                    title: "Back-end Development",
                    url: "/roadmaps/backend",
                },
                {
                    title: "Pre Medical",
                    url: "/roadmaps/premed",
                },
                {
                    title: "Business",
                    url: "/roadmaps/business",
                },
                {
                    title: "Law",
                    url: "/roadmaps/law",
                },
                {
                    title: "Entrepreneurship",
                    url: "/roadmaps/entrepreneurship",
                },
            ],
        },
    ],
    information: [
        {
            title: "Badges",
            url: "/badges",
            icon: Medal,
        },
        {
            title: "Current Challenges",
            url: "/challenges",
            icon: Swords,
        },
        {
            title: "Memory Techniques",
            url: "#",
            icon: Brain,
        },
        {
            title: "Boost Your Confidence",
            url: "#",
            icon: Rocket,
        },
        {
            title: "Study Tips",
            url: "#",
            icon: LibraryBig,
        },
        {
            title: "Mastering Complex Topics",
            url: "#",
            icon: GraduationCap,
        },
        {
            title: "Progress Reports",
            url: "#",
            icon: ChartNoAxesCombined,
        },
        {
            title: "Example Insights",
            url: "/mock_data",
            icon: TrendingUp,
        },
    ],
    foryou: [
        {
            title: "Leaderboards",
            url: "/leaderboards",
            icon: Table2,
        },
        {
            title: "Score History",
            url: "/scores",
            icon: FolderClock,
        },
    ],
    navSecondary: [
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
};

export function AppSidebar( { ...props }: React.ComponentProps<typeof Sidebar> ) {

    return (
        <Sidebar variant="inset" {...props} className="rounded-3xl shadow-md border hover:shadow-md">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Knowledge Knockout</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain title="Platforms" items={data.navMain} />
                <NavMain title="Information" items={data.information} />
                <NavMain title="For You" items={data.foryou} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
