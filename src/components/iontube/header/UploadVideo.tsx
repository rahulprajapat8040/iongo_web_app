import { MessageSquareWarning, SquarePlay, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const UploadVideo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-sm text-left"
            >
                <SquarePlay />
                Upload Video
            </button>

            {
                isOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div
                            ref={ref}
                            className="max-w-4xl w-full h-[550px] bg-white rounded-xl border shadow-lg">
                            <div
                                className="border-b h-14 flex items-center justify-between px-3"
                            >
                                <div>
                                    <h3 className="font-medium text-lg">Upload Video</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button>
                                        <MessageSquareWarning />
                                    </button>
                                    <button>
                                        <X />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UploadVideo;
