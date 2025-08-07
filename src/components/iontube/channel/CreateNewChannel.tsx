'use client'

import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CreateNewChannel = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-3 w-full flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
            >
                <PlusCircle className="w-5 h-5" /> Add New Channel
            </button>
            {
                isOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="w-64 h-64 bg-white drop-shadow-2xl border">

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CreateNewChannel;