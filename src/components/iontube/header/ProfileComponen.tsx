'use client'
import { RootState } from "@/lib/redux/Store";
import { BellIcon, User } from "lucide-react";
import { useSelector } from "react-redux";
import CreateButtonModel from "./CreateButtonModel";
import ProfileModel from "./ProfileModel";
import Link from "next/link";

const ProfileComponent = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="flex items-center gap-6">
            {
                user && (
                    <>
                        <CreateButtonModel />
                        <button>
                            <BellIcon />
                        </button>
                    </>
                )
            }
            <div className="w-full">
                {
                    user ? (
                        <>
                            <ProfileModel user={user} />
                        </>
                    ) : (
                        <div className="w-full flex justify-end">
                            <Link
                                href={'/auth/login'}
                                className="border border-blue-400 text-blue-400 flex px-2 py-1 rounded-full items-center w-fit text-nowrap gap-2 me-2"
                            >
                                <User />
                                Sign In
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileComponent;