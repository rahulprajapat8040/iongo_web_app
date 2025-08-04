import WatchHeader from "@/components/iontube/watch/Header";
import React from "react";

const IontubeLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <main className="w-full">
                <WatchHeader />
                {children}
            </main>
        </>
    )
}

export default IontubeLayout;