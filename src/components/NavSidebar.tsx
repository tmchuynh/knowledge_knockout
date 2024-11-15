"use client";

import * as React from "react";
import {
    BookCheck,
    BookOpen,
    Bot,
    Brain,
    Calendar1,
    CalendarRange,
    ChartSpline,
    CheckCheck,
    Cog,
    Command,
    FileChartColumnIncreasing,
    Frame,
    Gift,
    LifeBuoy,
    Map,
    Medal,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
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
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Quizzes",
            url: "/quiz",
            icon: CheckCheck,
            isActive: true,
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
            icon: BookOpen,
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
            ],
        },
    ],
    challenges: [
        {
            title: "Daily Challenge",
            url: "#",
            icon: Gift,
        },
        {
            title: "Weekly Challenge",
            url: "#",
            icon: Calendar1,
        },
        {
            title: "Monthly Challenge",
            url: "#",
            icon: CalendarRange,
        },
    ],
    examples: [
        {
            title: "Badges",
            url: "/badges",
            icon: Medal,
        },
        {
            title: "Progress Reports",
            url: "#",
            icon: FileChartColumnIncreasing,
        },
        {
            title: "Leaderboards",
            url: "/leaderboard",
            icon: ChartSpline,
        },
        {
            title: "Learning Paths",
            url: "#",
            icon: ChartSpline,
        },
        {
            title: "Learning Paths",
            url: "#",
            icon: ChartSpline,
        },
        {
            title: "Learning Paths",
            url: "#",
            icon: ChartSpline,
        },
        {
            title: "Learning Paths",
            url: "#",
            icon: ChartSpline,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Cog,
        },
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
                <NavDropdown title="Challenges" projects={data.challenges} />
                <NavMain title="Information" items={data.examples} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
