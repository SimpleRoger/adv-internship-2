import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import Link from "next/link";
import { IoIosSettings } from "react-icons/io";
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
import { BiLogOut } from "react-icons/bi";
import { signOutUser } from "@/redux/userSlice";

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

  const commonStyles =
    "h-full relative flex flex-col space-between gap-y-[60%] justify-start text-left";
  const specialStyles = "pb-[50px]";
  const styling = audioPage ? `${commonStyles} ${specialStyles}` : commonStyles;

  return (
    <div>
      <AuthModal />
      <SignUpModal />
      <div className="h-screen fixed top-0 left-0 hidden sm:flex pt-2 pl-2 pr-2 flex-col bg-[#f7faf9]">
        <nav className={styling}>
          <div>
            <div className="flex justify-start py-3 xl:p-3">
              <Image src={"/assets/logo.webp"} width={200} height={34} />
            </div>
            <Link href="/for-you">
              <SidebarLink Icon={AiFillHome} text={"For You"} />
            </Link>
            {/* <SidebarLink Icon={HashtagIcon} text={"My Library"} /> */}
            <SidebarLink Icon={AiFillBell} text={"Highlights"} />
            <SidebarLink Icon={AiOutlineInbox} text={"Search"} />
          </div>
          <div>
            {/* settings page */}
            <Link href="/settings">
              <SidebarLink Icon={IoIosSettings} text={"Settings"} />
            </Link>
            <SidebarLink Icon={AiOutlineUser} text={"Help & Support"} />
            {!email ? (
              <SidebarLink
                Icon={AiFillCiCircle}
                text={"Login"}
                click={() => dispatch(openLogInModal())}
              />
            ) : (
              <SidebarLink
                Icon={BiLogOut}
                text={"Logout"}
                click={() => handleSignOut()}
              />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
function SidebarLink({ text, Icon, click }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  return (
    <li
      onClick={click}
      className="hoverAnimation flex ml-3 mb-3 items-center text-xl space-x-3 cursor-pointer text-left
    "
    >
      <Icon className="h-7" />
      <span className="hidden md:inline">{text}</span>
    </li>
  );
}
export default Sidebar;
