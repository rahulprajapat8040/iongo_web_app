'use client'

import {
    Calendar,
    Clock,
    Film,
    Gamepad,
    History,
    Home,
    Inbox,
    Music,
    Search,
    Settings,
    TrendingUp,
    User,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../../ui/sidebar";
import Link from "next/link";

const sidebarSections = [
    {
        label: "",
        items: [
            { title: "Home", icon: <Home size={22} />, url: "#" },
            { title: "Shorts", icon: <Film />, url: "#" },
            { title: "Subscriptions", icon: <Inbox />, url: "#" },
        ],
    },
    {
        label: "You",
        items: [
            { title: "Your Channel", icon: <User />, url: "#" },
            { title: "History", icon: <History />, url: "#" },
            { title: "Watch Later", icon: <Clock />, url: "#" },
        ],
    },
    {
        label: "Explore",
        items: [
            { title: "Trending", icon: <TrendingUp />, url: "#" }, // Changed from Search to <Search />
            { title: "Music", icon: <Music />, url: "#" },
            { title: "Gaming", icon: <Gamepad />, url: "#" },
        ],
    },
    {
        label: "Settings",
        items: [
            { title: "Settings", icon: <Settings />, url: "#" },
            { title: "Report history", icon: <Inbox />, url: "#" },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black h-screen">
            <SidebarContent className="overflow-y-auto">
                {sidebarSections.map((section, idx) => (
                    <SidebarGroup key={idx}>
                        {section.label && (
                            <SidebarGroupLabel className="text-muted-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                                {section.label}
                            </SidebarGroupLabel>
                        )}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                className="group flex items-center gap-4 px-4 py-5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                            >
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <span className="text-lg font-medium text-gray-800 dark:text-gray-100 ">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>

                        {idx !== sidebarSections.length - 1 && (
                            <div className="border-b border-gray-200 dark:border-gray-800 my-2" />
                        )}
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
