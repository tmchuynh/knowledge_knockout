import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, BookOpenCheck, Settings, LayoutDashboard, Trophy, LogOut, Medal } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton } from "./ui/sidebar";


const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        authenticated: false,
    },
    {
        title: "Quizzes",
        url: "/quiz",
        icon: BookOpenCheck,
        authenticated: false,
    },
    {
        title: "Badges",
        url: "/badges",
        icon: Medal,
        authenticated: false,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        authenticated: false,
    },
    {
        title: "Leaderboard",
        url: "/leaderboard",
        icon: Trophy,
        authenticated: false,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        authenticated: false,
    },
    {
        title: "Logout",
        url: "/api/auth/signout",
        icon: LogOut,
        action: "logout",
        authenticated: true,
    },
];

export function AppSidebar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState( false );

    useEffect( () => {
        const token = localStorage.getItem( 'auth_token' );
        setIsAuthenticated( !!token );
    }, [] );

    const handleLogout = async () => {
        try {
            const response = await fetch( '/api/auth/signout', {
                method: 'POST',
            } );

            if ( response.ok ) {
                localStorage.removeItem( 'auth_token' );
                router.push( '/signin' );
            } else {
                console.error( 'Logout failed' );
            }
        } catch ( error ) {
            console.error( 'Error during logout:', error );
        }
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items
                                .filter( item => isAuthenticated || !item.authenticated )
                                .map( ( item, index ) => (
                                    <li key={`${ item.title }__${ index }`}>
                                        {item.action === "logout" ? (
                                            <SidebarMenuButton asChild tooltip={item.title}>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.title}</span>
                                                </button>
                                            </SidebarMenuButton>
                                        ) : (
                                            <SidebarMenuButton asChild tooltip={item.title}>
                                                <a href={item.url} className="flex items-center space-x-2">
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        )}
                                    </li>
                                ) )}
                            {!isAuthenticated && (
                                <li>
                                    <SidebarMenuButton asChild tooltip="Sign In">
                                        <a href="/signin" className="flex items-center space-x-2">
                                            <LogOut className="h-5 w-5" />
                                            <span>Sign In</span>
                                        </a>
                                    </SidebarMenuButton>
                                </li>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
