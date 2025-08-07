"use client";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "../../ui/drawer";
import Link from "next/link";
import {
    Clock,
    Film,
    Gamepad,
    History,
    Home,
    Inbox,
    Music,
    Settings,
    TrendingUp,
    User,
    Menu,
} from "lucide-react";

const sidebarSections = [
    {
        label: "",
        items: [
            { title: "Home", icon: <Home size={22} />, url: "#" },
            { title: "Shorts", icon: <Film size={22} />, url: "#" },
            { title: "Subscriptions", icon: <Inbox size={22} />, url: "#" },
        ],
    },
    {
        label: "You",
        items: [
            { title: "Your Channel", icon: <User size={22} />, url: "#" },
            { title: "History", icon: <History size={22} />, url: "#" },
            { title: "Watch Later", icon: <Clock size={22} />, url: "#" },
        ],
    },
    {
        label: "Explore",
        items: [
            { title: "Trending", icon: <TrendingUp size={22} />, url: "#" },
            { title: "Music", icon: <Music size={22} />, url: "#" },
            { title: "Gaming", icon: <Gamepad size={22} />, url: "#" },
        ],
    },
    {
        label: "Settings",
        items: [
            { title: "Settings", icon: <Settings size={22} />, url: "#" },
            { title: "Report History", icon: <Inbox size={22} />, url: "#" },
        ],
    },
];

const SideDrawer = () => {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <button className="p-3">
                    <Menu size={25} className=" stroke-1" />
                </button>
            </DrawerTrigger>
            <DrawerContent className="w-[280px] sm:w-[320px] bg-white dark:bg-zinc-900 h-full border-r border-border px-3 py-5">
                <div className="flex flex-col gap-6 overflow-y-auto">
                    {sidebarSections.map((section, idx) => (
                        <div key={idx} className="space-y-1">
                            {section.label && (
                                <div className="text-muted-foreground px-4 text-xs font-semibold uppercase tracking-wider mb-2">
                                    {section.label}
                                </div>
                            )}
                            {section.items.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.url}
                                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        {item.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;
