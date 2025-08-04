'use client';

import ImagePreview from "@/components/common/ImagePreview";
import { VideoListInterface } from "@/lib/interfaces/iontube/allVideosList.interface";
import { Helper } from "@/helper/helper";

const VideoCard = ({ data }: { data: VideoListInterface }) => {
    const { thumbnailUrl, title, views, createdAt, channel } = data;

    return (
        <div className="w-full max-w-xs cursor-pointer">
            {/* Thumbnail */}
            <div className="w-full h-44 rounded-xl overflow-hidden relative">
                <ImagePreview
                    src={thumbnailUrl}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                    path="iontube"
                />
                {/* Duration - if you have it formatted */}
                {data.duration && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                        {data.duration}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex gap-3 mt-2">
                {/* Channel Image */}
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                    {channel?.image ? (
                        <ImagePreview
                            src={channel.image}
                            alt={channel.channelName}
                            width={1000}
                            height={1000}
                            path="iontube"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full" />
                    )}
                </div>

                {/* Video Info */}
                <div className="flex flex-col w-full">
                    <h4 className="text-sm font-semibold leading-tight line-clamp-2">{title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{channel?.channelName}</p>
                    <p className="text-xs text-gray-500">
                        {Intl.NumberFormat('en', { notation: 'compact' }).format(views)} views •{" "}
                        {Helper.getDateTimeDiff(createdAt)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
