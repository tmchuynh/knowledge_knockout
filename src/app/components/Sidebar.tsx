import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/app/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Quizzes",
        url: "/quiz",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Search,
    },
    {
        title: "Leaderboard",
        url: "/leaderboard",
        icon: Search,
    },
    {
        title: "Login",
        url: "/api/auth/signin",
        icon: User,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];


export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map( ( item ) => (
                                <li key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url} className="flex items-center space-x-2">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </li>
                            ) )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
