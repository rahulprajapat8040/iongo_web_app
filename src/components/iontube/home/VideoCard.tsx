import ImagePreview from "@/components/common/ImagePreview";
import { VideoListInterface } from "@/lib/interfaces/iontube/allVideosList.interface";

const VideoCard = ({ data }: { data: VideoListInterface }) => {
    return (
        <div className="border max-w-96 w-full h-64">
            <ImagePreview
                src={data.thumbnailUrl}
                alt={data.title}
                width={1000}
                height={1000}
                className="w-full rounded-xl"
                path="iontube"
            />
            <h4 className="line-clamp-2 pt-2 px-1 font-medium text-lg">{data.title}</h4>
        </div>
    )
}

export default VideoCard;