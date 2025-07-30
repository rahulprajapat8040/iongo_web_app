'use client'
import ImagePreview from "@/components/common/ImagePreview";
import { RootState } from "@/lib/redux/Store";
import { BellIcon, PlusIcon, User } from "lucide-react";
import { useSelector } from "react-redux";
import CreateButtonModel from "./CreateButtonModel";

const ProfileComponent = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="flex items-center gap-6">
            <CreateButtonModel />
            <button>
                <BellIcon />
            </button>
            <div>
                {
                    user ? (
                        <>
                            <button>
                                <ImagePreview
                                    src={user.profilePhoto}
                                    alt={user.firstName}
                                    width={1000}
                                    height={1000}
                                    path="auth"
                                    className="w-12 h-12 object-cover"
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="border border-blue-400 text-blue-400 flex px-2 py-1 rounded-full items-center w-fit text-nowrap gap-2 me-2"
                            >
                                <User />
                                Sign In
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileComponent;