import { VideoListInterface } from "@/lib/interfaces/iontube/allVideosList.interface";
import VideoCard from "./VideoCard";

const AllVideosList = (
    { initialData }: { initialData: VideoListInterface[] }
) => {
    return (
        <div className="grid grid-cols-3 gap-4 place-items-center place-content-center py-4 px-3">
            {
                initialData.map((item) => {
                    return (
                        <VideoCard
                            key={item.id}
                            data={item}
                        />
                    )
                })
            }
        </div>
    )
}

export default AllVideosList;