import { SidebarTrigger } from "../../ui/sidebar";
import ProfileComponent from "../header/ProfileComponen";
import Searchbar from "../header/Searchbar";

const Header = () => {
    return (
        <header className="h-13 flex items-center justify-between border-b w-full">
            <div className="w-2/5">
                <SidebarTrigger />
            </div>
            <Searchbar />
            <div className="w-2/5">
                <ProfileComponent />
            </div>
        </header>
    )
}

export default Header;