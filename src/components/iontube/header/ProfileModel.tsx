'use client';

import ImagePreview from "@/components/common/ImagePreview";
import { UserInterface } from "@/lib/interfaces/user.interface";
import { RootState } from "@/lib/redux/Store";
import { getActiveChannel, setActiveChannel } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateNewChannel from "../channel/CreateNewChannel";

const ProfileModel = ({ user }: { user: UserInterface }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const activeChannelId = getActiveChannel();
    const channels = useSelector((state: RootState) => state.channel.channels);

    const handleChannelSwitch = (channelId: string) => {
        setActiveChannel(channelId);
        setIsOpen(false);
        router.refresh(); // To re-trigger layout/server-side changes if needed
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(prev => !prev)} className="focus:outline-none">
                {
                    user.profilePhoto ? (
                        <>
                            <ImagePreview
                                src={user.profilePhoto}
                                alt={user.firstName}
                                width={1000}
                                height={1000}
                                path="auth"
                                className="w-10 h-10 object-cover rounded-full border border-gray-300"
                            />
                        </>
                    ) : (
                        <>
                            <div className={`bg-blue-700 rounded-full h-10 w-10 text-center items-center justify-center flex text-2xl text-white font-medium`}>
                                {user.firstName.charAt(0)}
                            </div>
                        </>
                    )
                }
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl z-50 p-4 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <ImagePreview
                            src={user.profilePhoto}
                            alt={user.firstName}
                            width={1000}
                            height={1000}
                            path="auth"
                            className="w-10 h-10 object-cover rounded-full border"
                        />
                        <div>
                            <h4 className="text-sm font-semibold">{user.firstName} {user.lastName}</h4>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="border-t pt-3">
                        <h6 className="text-xs text-gray-500 mb-1">Your Channels</h6>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {channels?.data.map((channel) => (
                                <div
                                    key={channel.id}
                                    onClick={() => handleChannelSwitch(channel.id)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition hover:bg-gray-100 ${activeChannelId === channel.id ? "bg-gray-100" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <ImagePreview
                                            src={channel.image}
                                            alt={channel.channelTitle}
                                            width={1000}
                                            height={1000}
                                            path="iontube"
                                            className="w-8 h-8 rounded-full border"
                                        />
                                        <span className="text-sm">@{channel.channelName}</span>
                                    </div>
                                    {activeChannelId === channel.id && (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add New Channel */}
                        <CreateNewChannel />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileModel;
