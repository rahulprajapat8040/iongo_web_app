import { apiRequest } from "@/helper/api.helper";
import { Helper } from "@/helper/helper";
import { RootState } from "@/lib/redux/Store";
import { getActiveChannel } from "@/lib/utils";
import { ArrowUpFromLine, Flag, MessageSquareWarning, SquarePlay, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";


type UploadVideoFormValues = {
    video: FileList | null;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'private';
    channelId: string;
    tags: string[];
    thumbnail: FileList | null;
    videoId?: string;
};


const Step1 = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { register, setValue, watch } = useFormContext<UploadVideoFormValues>();
    const videoFile = watch("video");
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const uploadFile = async () => {
            if (videoFile && videoFile.length > 0) {
                const file = videoFile[0];
                const channelId = getActiveChannel()
                const formData = new FormData();
                formData.append("video", file);
                formData.append("title", file.name);
                user && formData.append("uploadedById", user.id)
                channelId && formData.append("channelId", channelId);
                const videoDuration = Helper.getVideoDurationInSeconds(file)
                formData.append("duration", (await videoDuration).toString());
                setIsActive(true);
                try {
                    const PATH = `${process.env.NEXT_PUBLIC_UPLOAD_VIDEO}`
                    const res = await apiRequest("post", PATH, formData); // Replace with your API route
                    console.log("Upload success:", res.data);

                    // Optionally update fields with backend response
                    if (res.data.success) {
                        setValue("title", file.name);
                        setValue("videoId", res.data.data.id); // ← store videoId
                        onUploadSuccess();
                        setIsActive(false);
                    }
                } catch (err) {
                    console.error("Upload failed:", err);
                    setIsActive(false)
                }
            }
        };
        uploadFile();
    }, [videoFile]);

    return (
        <div className="w-full h-full flex flex-col relative">
            {isActive && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin" />
                        <p className="text-sm font-medium text-gray-700">Uploading...</p>
                    </div>
                </div>
            )}
            <div className="border-b h-16 flex items-center justify-between px-3">
                <h3 className="font-medium text-lg">Upload Video</h3>
                <div className="flex items-center gap-3">
                    <button><MessageSquareWarning /></button>
                    <button><X /></button>
                </div>
            </div>

            <div className="h-full flex flex-col items-center justify-center text-center">
                <label htmlFor="video" className="bg-gray-300/30 p-8 cursor-pointer rounded-full">
                    <ArrowUpFromLine size={50} color="gray" />
                </label>
                <div className="py-4 space-y-2">
                    <h4 className="font-medium">Drag and drop video files to upload</h4>
                    <p className="text-sm text-gray-500">Your videos will be private until you publish them.</p>
                </div>
                <input hidden type="file" {...register("video")} id="video" />
                <label htmlFor="video" className="px-5 font-medium bg-black text-white py-2.5 cursor-pointer rounded-full">
                    Select File
                </label>
            </div>

            <div className="pb-3 text-center text-[12px] font-medium text-gray-500">
                <p>
                    By submitting your videos to IonGo, you agree to our
                    <Link href="#" className="text-blue-500"> Terms of Service</Link> and
                    <Link href="#" className="text-blue-500"> Community Guidelines</Link>.
                </p>
                <p>
                    Please don’t violate copyright or privacy rights.
                    <Link href="#" className="text-blue-500"> Learn more</Link>
                </p>
            </div>
        </div>
    );
};


const Step2 = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
    const [isActive, setIsActive] = useState(false)
    const [isFocused, setIsFocused] = useState({
        firstInput: false,
        secondInput: false,
    });

    const { register, setValue, watch } = useFormContext<UploadVideoFormValues>();

    const title = watch("title");
    const videoId = watch("videoId");
    const tags = watch("tags");
    const description = watch("description");
    const thumbnail = watch("thumbnail");

    useEffect(() => {
        const titleTags = (title?.match(/#\w+/g) || []).map(tag => tag.slice(1));
        const descTags = (description?.match(/#\w+/g) || []).map(tag => tag.slice(1));
        const allTags = Array.from(new Set([...titleTags, ...descTags])); // remove duplicates
        setValue("tags", allTags);
    }, [title, description, setValue]);

    const updateData = async () => {
        const formData = new FormData();
        if (thumbnail) {
            formData.append("title", title);
            formData.append("description", description)
            formData.append("tags", JSON.stringify(tags))
            formData.append("thumbnailUrl", thumbnail[0])
            setIsActive(true)
            try {
                const PATH = `${process.env.NEXT_PUBLIC_UPDATE_VIDEO_DETAIL}?videoId=${videoId}`
                const res = await apiRequest("put", PATH, formData); // Replace with your API route
                console.log("Upload success:", res.data);

                // Optionally update fields with backend response
                if (res.data.success) {
                    setIsActive(false)
                    onUploadSuccess()

                }
            } catch (err) {
                console.error("Upload failed:", err);
                setIsActive(false)
            }
        }

    }

    return (
        <div className="h-full overflow-y-scroll relative">
            {isActive && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin" />
                        <p className="text-sm font-medium text-gray-700">Uploading...</p>
                    </div>
                </div>
            )}
            <div className="border-b h-16 flex items-center justify-between px-3">
                <h3 className="font-medium text-lg line-clamp-1 max-w-xl">
                    {title}
                </h3>
                <div className="flex items-center gap-3">
                    <button><MessageSquareWarning /></button>
                    <button><X /></button>
                </div>
            </div>

            <div className="max-w-3xl space-y-5 py-6 mx-auto">
                <h4 className="text-2xl font-semibold">Details</h4>

                {/* Title Input */}
                <div className={`border flex flex-col rounded-md transition-all ${isFocused.firstInput ? 'border-black' : 'border-gray-200'}`}>
                    <label htmlFor="videoTitle" className="pt-1 px-2 font-medium text-gray-500">
                        Title <span className="text-red-500">(required)</span>
                    </label>
                    <textarea
                        id="videoTitle"
                        placeholder="Enter the video title here. (use # for hashtags)"
                        className="outline-none py-2 px-2 resize-none"
                        maxLength={100}
                        {...register("title")}
                        onFocus={() => setIsFocused(prev => ({ ...prev, firstInput: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, firstInput: false }))}
                    />
                </div>

                {/* Description Input */}
                <div className={`border flex flex-col rounded-md transition-all ${isFocused.secondInput ? 'border-black' : 'border-gray-200'}`}>
                    <label htmlFor="videoDesc" className="pt-1 px-2 font-medium text-gray-500">
                        Description
                    </label>
                    <textarea
                        id="videoDesc"
                        className="outline-none py-2 px-2 resize-none"
                        maxLength={5000}
                        rows={5}
                        {...register("description")}
                        onFocus={() => setIsFocused(prev => ({ ...prev, secondInput: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, secondInput: false }))}
                    />
                </div>

                {/* Thumbnail Upload */}
                <div className="h-full flex flex-col items-center justify-center text-center">
                    <label htmlFor="video" className="bg-gray-300/30 p-8 cursor-pointer rounded-full">
                        <ArrowUpFromLine size={50} color="gray" />
                    </label>
                    <div className="py-4 space-y-2">
                        <h4 className="font-medium">Drag and drop pic to upload Thumbnail</h4>
                    </div>
                    <input hidden type="file" id="video" {...register("thumbnail")} />
                </div>
                <div className="w-full flex justify-end">
                    <button
                        type="button"
                        onClick={updateData}
                        className="px-5 py-2 bg-black text-white rounded-full font-medium">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};



const UploadVideo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(1)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const methods = useForm<UploadVideoFormValues>({
        defaultValues: {
            video: null,
            title: '',
            description: '',
            status: 'draft',
            channelId: '',
            tags: [],
        },
    });

    const handleSubmit: SubmitHandler<UploadVideoFormValues> = async (data) => {
        // const PATH = `${process.env.NEXT_PUBLIC_SIGNUP_API}`
        // const res = await apiRequest("post", PATH, {
        //     ...data
        // });
        console.log('data iss', data)
        // if (res.data.success) {
        // };
    };


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
                        <FormProvider {...methods} >
                            <div
                                ref={ref}
                                className="max-w-4xl w-full h-[550px] bg-white rounded-xl border shadow-lg">
                                <form
                                    onSubmit={methods.handleSubmit(handleSubmit)}
                                    className="w-full h-full gap-6"
                                >
                                    {step === 1 && <Step1 onUploadSuccess={() => setStep(2)} />}
                                    {step === 2 && <Step2 onUploadSuccess={() => setIsOpen(false)} />}
                                </form>
                            </div>
                        </FormProvider>
                    </div >
                )
            }
        </>
    )
}

export default UploadVideo;
