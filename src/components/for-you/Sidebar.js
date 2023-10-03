import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import Link from "next/link";
import { IoIosSettings } from "react-icons/io";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { BiHelpCircle } from "react-icons/bi";
import {
  AiFillHome,
  AiFillBell,
  AiOutlineInbox,
  AiFillBook,
  AiOutlineUser,
  AiFillCiCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../AuthModal";
import {
  closeLogInModal,
  closeSignUpModal,
  openLogInModal,
} from "@/redux/modalSlice";
import SignUpModal from "../SignUpModal";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { BiLogOut, BiPencil } from "react-icons/bi";
import { signOutUser } from "@/redux/userSlice";
import { BsBookmark } from "react-icons/bs";

function Sidebar({ audioPage }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignUpModal());
    dispatch(closeLogInModal());
  }
  const email = useSelector((state) => state.user.email);

  const commonStyles = "";
  const specialStyles = "pb-[100px]";
  const styling = audioPage ? `${commonStyles} ${specialStyles}` : commonStyles;

  return (
    <div>
      <AuthModal />
      <SignUpModal />
      <div
        className={`h-screen top-0 left-0 md:flex fixed w-[250px] hidden pt-2 pl-2 pr-2 bg-[#f7faf9] flex-col text-left justify-between ${styling}`}
      >
        <div>
          <div className="flex justify-start py-3 px-3 mb-5">
            <Image src={"/assets/logo.webp"} width={200} height={34} />
          </div>
          <Link href="/for-you">
            <SidebarLink Icon={AiFillHome} text={"For You"} allowed={true} />
          </Link>
          <SidebarLink Icon={BsBookmark} text={"My Library"} allowed={false} />
          <SidebarLink Icon={BiPencil} text={"Highlights"} allowed={false} />
          <SidebarLink
            Icon={PiMagnifyingGlassLight}
            text={"Search"}
            allowed={false}
          />
        </div>
        <div className="flex flex-col justify-end">
          {/* settings page */}
          <Link href="/settings">
            <SidebarLink
              Icon={IoIosSettings}
              text={"Settings"}
              allowed={true}
            />
          </Link>
          <SidebarLink Icon={BiHelpCircle} text={"Help & Support"} />
          {!email ? (
            <SidebarLink
              Icon={AiFillCiCircle}
              text={"Login"}
              click={() => dispatch(openLogInModal())}
              allowed={true}
            />
          ) : (
            <SidebarLink
              Icon={BiLogOut}
              text={"Logout"}
              click={() => handleSignOut()}
              allowed={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
function SidebarLink({ text, Icon, click, allowed }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  return (
    <li
      onClick={click}
      className={`{allowed ? 'cursor-pointer ' : 'cursor-not-allowed'} hoverAnimation flex ml-3 mb-3 items-center text-xl space-x-3 text-left hover:bg-gray-100
      transition duration-300 ease-in-out py-3`}
    >
      <Icon className="h-7" />
      <span className="hidden md:inline">{text}</span>
    </li>
  );
}
export default Sidebar;
