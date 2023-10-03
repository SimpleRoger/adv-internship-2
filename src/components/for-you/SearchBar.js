import { AiFillHighlight, AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash"; // npmYou'll need the lodash library for debounce
import classNames from "classnames";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";

import {
  AiFillHome,
  AiFillBell,
  AiOutlineInbox,
  AiFillBook,
  AiOutlineUser,
  AiFillCiCircle,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BiCross, BiLogOut } from "react-icons/bi";
import { Skelly } from "../Skelly";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { signOutUser } from "@/redux/userSlice";
import { closeLogInModal, closeSignUpModal } from "@/redux/modalSlice";
import { BsClock } from "react-icons/bs";

export default function SearchBar() {
  const email = useSelector((state) => state.user.email);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const durationsRef = useRef({});
  const [durations, setDurations] = useState({});
  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignUpModal());
    dispatch(closeLogInModal());
  }
  const performSearch = async (search) => {
    try {
      setLoading(true);
      // Implement your search logic here and set the search results
      // For example, make an API call to fetch search results
      const response =
        await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}
      `);
      const data = await response.json();
      setSearchResults(data.slice(0, 3));
      setLoading(false);
      console.log(searchResults);
      const durationsObj = {};
      data.forEach((book) => {
        if (book.audioLink) {
          const audioElement = new Audio(book.audioLink);
          durationsRef.current[book.id] = audioElement;
          audioElement.addEventListener("loadedmetadata", () => {
            durationsObj[book.id] = audioElement.duration;
            setDurations({ ...durationsObj });
          });
        }
      });
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const commonStyles =
    "h-full relative flex flex-col space-between gap-y-[60%] justify-start text-left z-10";
  const specialStyles = "pb-[50px] z-10";
  const styling = `${commonStyles} ${specialStyles}`;
  const debouncedSearch = debounce((text) => {
    performSearch(text);
  }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

  // Handle input changes
  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchTerm(text);
    debouncedSearch(text); // Call the debounced search function
  };
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    // setIsHidden(!isHidden);
  };
  //allow for search bar to show books underneath
  return (
    <>
      {/* screen blocker */}
      {isHidden && (
        <div
          className="transition-transform duration-300 ease-in-out fixed top-00 left-00 bg-[#3a4649] w-full h-full opacity-[0.75] z-[5] md:`hidden`"
          onClick={() => {
            setIsHidden(false);
            setModalOpen(!modalOpen);
          }}
        ></div>
      )}
      <div className="bg-[#fff] border-b border-[#e1e7ea] h-[80px] z-1">
        <div className="flex items-center justify-between px-[32px] max-w-[1070px] mx-auto h-[100%]">
          <figure></figure>
          <div className="relative flex gap-[24px] max-w-[350px] w-[100%] mr-[10px]">
            <div className="flex items-center w-[100%] ">
              <input
                className="items-center w-[600px] h-[40px] px-[16px] bg-[#f1f6f4] color-[#042330] rounded-[8px] border-[#e1e7ea] "
                type="text-value"
                placeholder="Search for books"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <div className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
                {searchTerm == "" ? (
                  <AiOutlineSearch className="w-[40px] " />
                ) : (
                  <RxCross1
                    onClick={() => {
                      setSearchTerm("");
                    }}
                  />
                )}
              </div>
            </div>

            {searchTerm != "" &&
              (loading ? (
                <div className="absolute top-[70px] bg-white border border-[#e1e7ea] p-[16px] flex flex-col max-w-[440px] shadow-my-box-shadow gap-10 w-[100%] z-25">
                  <Skelly width={300} height={100} />
                  <Skelly width={300} height={100} />
                  <Skelly width={300} height={100} />
                </div>
              ) : (
                <div className="absolute top-[70px] bg-white border border-[#e1e7ea] p-[16px] flex flex-col max-w-[440px] shadow-my-box-shadow gap-10 w-[100%] z-20">
                  {searchResults.length == 0 ? (
                    <p>No books found</p>
                  ) : (
                    searchResults.map((book, index) => {
                      const isLastElement = index === searchResults.length - 1;

                      // Define the classes for the element
                      const elementClasses = classNames(
                        "flex pb-5 z-20", // Always apply these classes
                        {
                          "border-b border-b-gray-500": !isLastElement, // Apply these if it's the last element
                        }
                      );
                      return (
                        <Link href={`/book/${book.id}`}>
                          <div className={elementClasses}>
                            <img
                              src={book.imageLink}
                              className="w-[100px] h-[110px] mr-2"
                            ></img>
                            <div className="flex flex-col gap-2">
                              <div className="text-[15px]">
                                <h4>{book.title}</h4>
                                <h4 className="font-thin">{book.author}</h4>
                                {/* <h4>{book.author}</h4> */}
                              </div>
                              <div className="flex gap-2">
                                <BsClock />
                                {formatTime(durations[book.id]) || "0:00"}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              ))}
          </div>
          <div class="md:hidden">
            {/* <!-- Hamburger button --> */}
            <button id="menu-toggle" class="block text-gray-500">
              <GiHamburgerMenu
                size={28}
                onClick={() => {
                  toggleVisibility;
                  setModalOpen(!modalOpen);
                  setIsHidden(true);
                  // console.log(setModalOpen);
                }}
              />
            </button>

            {/* <!-- Navigation menu --> */}
            {/* <!-- Menu items go here --> */}
            {modalOpen && (
              <div
                id="menu"
                class=" bg-white fixed top-0 left-0 w-64 h-full shadow-lg z-20"
              >
                <nav className={styling}>
                  <div>
                    <div className="flex justify-start py-3 px-3">
                      <Image
                        src={"/assets/logo.webp"}
                        width={200}
                        height={34}
                      />
                    </div>
                    <Link href="/for-you">
                      <SidebarLink Icon={AiFillHome} text={"For You"} />
                    </Link>

                    <SidebarLink Icon={AiFillHighlight} text={"Highlights"} />
                    <SidebarLink Icon={AiOutlineSearch} text={"Search"} />
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
            )}
          </div>
        </div>
      </div>
    </>
  );

  function SidebarLink({ text, Icon, click }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modals.logInModalOpen);
    return (
      <li
        onClick={click}
        className="hoverAnimation flex ml-3 mb-3 items-center text-xl space-x-3 cursor-pointer text-left text-black
      "
      >
        <Icon className="h-7" />
        <span className="md:inline ">{text}</span>
      </li>
    );
  }
}
