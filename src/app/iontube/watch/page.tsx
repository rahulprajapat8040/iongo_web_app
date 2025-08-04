import { apiCall } from "@/app/apiCall";
import VideoPlayer from "@/components/iontube/watch/VideoPlayer";
import { VideoDetailInterface } from "@/lib/interfaces/iontube/videoDetail.interface";

const Watch = async ({ searchParams }: { searchParams: Promise<{ v: string, vId: string }> }) => {
    const { v, vId } = await searchParams
    const res: VideoDetailInterface = await apiCall(`${process.env.NEXT_PUBLIC_GET_VIDEO_BY_ID}?videoId=${vId}`)
    return (
        <VideoPlayer videoUrl={res.videoOriginal} />
    )
}

export default Watch;