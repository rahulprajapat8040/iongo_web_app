'use client';

import { PlusIcon, } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import UploadVideo from "./UploadVideo";

const CreateButtonModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="relative inline-block" ref={ref}>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full font-medium transition-all"
                >
                    <PlusIcon size={20} />
                    Create
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white rounded-xl shadow-xl border z-50 overflow-hidden"
                        >
                            {/* {[
                                { label: "Upload Video", icon: <SquarePlay size={20} />, },
                                { label: "Go Live", icon: <Radio size={20} /> },
                                { label: "Create Post", icon: <SquarePen size={20} /> },
                            ].map((item, idx) => ( */}
                            <UploadVideo />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {selectedAction === "Upload Video" && <UploadVideo />}
            {/* {selectedAction === "Go Live" && <GoLiveComponent />} */}
            {/* {selectedAction === "Create Post" && <CreatePostComponent />} */}
        </>
    );
};

export default CreateButtonModel;
