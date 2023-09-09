import Image from "next/image";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import {
  AiFillHome,
  AiFillBell,
  AiOutlineInbox,
  AiFillBook,
  AiOutlineUser,
  AiFillCiCircle,
} from "react-icons/ai";

function Sidebar() {
  return (
    <div className="h-screen top-0 hidden sm:flex pt-2 pl-2 pr-2 flex-col bg-[#f7faf9]">
      <nav className="h-full relative flex flex-col space-between gap-y-[60%] justify-start text-left">
        <div>
          <div className="flex justify-start py-3 xl:p-3">
            <Image src={"/assets/logo.webp"} width={200} height={34} />
          </div>
          <SidebarLink Icon={AiFillHome} text={"For You"} />
          {/* <SidebarLink Icon={HashtagIcon} text={"My Library"} /> */}
          <SidebarLink Icon={AiFillBell} text={"Highlights"} />
          <SidebarLink Icon={AiOutlineInbox} text={"Search"} />
        </div>
        <div>
          <SidebarLink Icon={AiFillBook} text={"Settings"} />
          <SidebarLink Icon={AiOutlineUser} text={"Help & Support"} />
          <SidebarLink Icon={AiFillCiCircle} text={"Login"} />
        </div>
      </nav>
    </div>
  );
}
function SidebarLink({ text, Icon }) {
  return (
    <li
      className="hoverAnimation flex ml-3 mb-3 items-center text-xl space-x-3 hover:cursor-not-allowed text-left
    "
    >
      <Icon className="h-7" />
      <span className="hidden md:inline">{text}</span>
    </li>
  );
}
export default Sidebar;
