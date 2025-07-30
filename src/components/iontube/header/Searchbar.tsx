import { Search } from "lucide-react";

const Searchbar = () => {
    return (
        <div className="w-full flex items-center">
            <input
                className="border w-[80%] py-2 px-3 font-medium rounded-l-full border-gray-400 outline-none"
                placeholder="Search"
                type="text"
            />
            <button className="border border-l-0 rounded-r-full bg-gray-400/30 border-gray-400 h-full py-2 px-5">
                <Search />
            </button>
        </div>
    )
}

export default Searchbar;