import AllVideosList from "@/components/iontube/home/AllVideosList";
import { apiCall } from "../../apiCall";
import { AllVideosListInterface } from "@/lib/interfaces/iontube/allVideosList.interface";

const Iontube = async () => {
    const PATH = `${process.env.NEXT_PUBLIC_GET_ALL_VIDEOS}`
    const res: AllVideosListInterface = await apiCall(PATH)

    return (
        <section>
            <AllVideosList initialData={res.data} />
        </section>
    )
}

export default Iontube;