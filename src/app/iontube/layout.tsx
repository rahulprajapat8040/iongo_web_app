import { AppSidebar } from "@/components/iontube/common/AppSidebar";
import Header from "@/components/iontube/common/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const IontubeLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <Header />
                    {children}
                </main>
            </SidebarProvider>
        </>
    )
}

export default IontubeLayout;