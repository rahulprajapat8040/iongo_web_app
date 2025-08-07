'use client'
import { apiRequest } from "@/helper/api.helper";
import { getOrCreateDeviceId, setAccessToken } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
    const router = useRouter()
    const [states, setStates] = useState({
        email: '',
        password: ''
    })

    const handleStateChange = (key: string, value: string) => {
        setStates((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const deviceId = getOrCreateDeviceId()
        const PATH = `${process.env.NEXT_PUBLIC_LOGIN_API}`
        const res = await apiRequest("post", PATH, { ...states, deviceId, deviceToken: 'random-token' })
        if (res.data.success) {
            setAccessToken(res.data.data.accessToken);
            router.push('/')
        }
    }

    return (
        <section className="flex justify-center items-center w-full h-dvh">
            <div className="bg-white max-w-4xl flex items-center justify-between px-3 w-full h-[400px] drop-shadow-2xl border-gray-300 rounded-2xl border">
                <div className="h-full flex items-center justify-center w-full">
                    <Image
                        src={`/assets/signup_image.svg`}
                        alt="signup"
                        width={300}
                        height={300}
                    />
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col gap-4 p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 w-full text-gray-600">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={states.email}
                                    onChange={(e) => handleStateChange("email", e.target.value)}
                                    className="border outline-none border-gray-400 px-2 py-3 rounded-lg"
                                    placeholder="eg. yourname@iongo.com"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={states.password}
                                    onChange={(e) => handleStateChange("password", e.target.value)}
                                    className="border outline-none border-gray-400 px-2 py-3 rounded-lg"
                                    placeholder="password..."
                                />
                            </div>
                            <div className="w-full flex gap-2 justify-end mt-4 px-4 pb-4">
                                <button
                                    className="bg-yellow-500 flex items-center justify-center gap-2 w-[200px] py-2.5 rounded-md text-black font-medium text-lg"
                                >
                                    Login <MoveRight />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;