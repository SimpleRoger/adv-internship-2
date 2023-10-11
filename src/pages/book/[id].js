import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
// import { Book } from "../../../types";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { BiBookmark, BiStar } from "react-icons/bi";
import { Skelly } from "../../components/Skelly";
import {
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineClockCircle,
} from "react-icons/ai";
import Sidebar from "../../components/for-you/Sidebar";
import SearchBar from "../../components/for-you/SearchBar";
import { BsFillBookmarkFill, BsFillBookmarkXFill, BsMic } from "react-icons/bs";
import { RiBookMarkLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { openLogInModal } from "@/redux/modalSlice";
import AuthModal from "@/components/AuthModal";
import { app, auth } from "../../../firebase";
import { getPremiumStatus } from "@/components/choose-plan/getPremiumStatus";

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id: id,
    },
  };
}

// interface BookProps {
//   id: string;
// }
// type slice = {
//   user: userSlice; // Replace 'string' with the actual data type of 'someValue'.
//   modals: modalSlice;
// };

// type userSlice = {
//   email: string;
//   subscribed: boolean;
// };
// type modalSlice = {
//   logInModalOpen: boolean;
// };

export default function Book({ id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  const [loading, setLoading] = useState(true);
  // get email
  const email = useSelector((state) => state.user.email);
  const subscribed = useSelector((state) => state.user.subscribed);

  const [bookData, setBookData] = useState();
  const [duration, setDuration] = useState();
  const [isPremium, setIsPremium] = useState();
  const durationsRef = useRef({});
  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
      console.log(newPremiumStatus);
      // console.log(await getPremiumStatus(app));
    };
    checkPremium();
    // console.log(isPremium);
  }, [auth.currentUser]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await response.json();
      setBookData(data);
      console.log(bookData);
      setLoading(false);
      const durationsObj = {};
      if (data.audioLink) {
        const audioElement = new Audio(data.audioLink);
        durationsRef.current[data.id] = audioElement;
        audioElement.addEventListener("loadedmetadata", () => {
          setDuration(audioElement.duration);
        });
      }
      console.log(durationsObj);
    }
    fetchData();
  }, []);

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

  //read function
  function read() {
    if (!email) {
      dispatch(openLogInModal());
    } else if (
      bookData?.subscriptionRequired == true &&
      setIsPremium == false
    ) {
      console.log(bookData?.subscriptionRequired);
      console.log(subscribed);
      router.push("/choose-plan"); // Replace '/new-route' with the actual path.
    } else {
      router.push(`/player/${id}`); // Replace '/new-route' with the actual path.
    }
  }

  return (
    <div className="flex flex-col width-full md:ml-[260px] mx-8">
      <SearchBar />
      <Sidebar />
      {/* main content */}
      <div className=" max-w-[1070px] w-full mx-auto p-2 mt-10">
        <div className=" w-full">
          {loading ? (
            <div className="flex gap-7">
              <div className="flex flex-col gap-[16px]">
                <h1 className="book-content-title">
                  {" "}
                  <Skelly width={750} height={100} />{" "}
                </h1>
                <h4 className="book-content-author">
                  {" "}
                  <Skelly width={100} height={25} />
                </h4>
                <h2 className="book-content-subtitle">
                  <Skelly width={400} height={25} />
                </h2>
                <Skelly width={400} height={25} />
                <Skelly width={400} height={25} />
                <Skelly width={400} height={25} />
                <Skelly width={400} height={400} />
              </div>
              <Skelly width={200} height={400} />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row-reverse gap-[16px]">
              <div className="flex max-w-[300px] min-w-[300px] max-h-[300px] justify-center">
                <img src={bookData?.imageLink} />
              </div>
              {/* main */}
              <div className="flex flex-col w-[100%] max-w-[700px]">
                <h1 className="text-4xl">{bookData?.title}</h1>
                <h1 className="text-2xl">{bookData?.author}</h1>
                <h3 className="text-xl font-thin">{bookData?.subTitle}</h3>
                <div className="border-t border-b border-gray-300 p-4 my-6">
                  <div className="flex flex-wrap max-w-[420px] ">
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BiStar className="w-[100%]" />
                      </div>
                      <p>{bookData?.averageRating} &nbsp;</p>
                      <p>({bookData?.totalRating}) ratings</p>
                    </div>
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineClockCircle className="w-[100%]" />
                      </div>
                      <p>{formatTime(duration) || "0:00"}</p>
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BsMic className="w-[100%]" />
                      </div>
                      <p>{bookData?.type} &nbsp;</p>
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineBulb className="w-[100%]" />
                      </div>
                      <p>{bookData?.keyIdeas} Key Ideas</p>
                    </div>
                  </div>
                </div>
                {/* //buttons */}
                <div className="flex gap-[16px] mb-[24px] ">
                  <button
                    onClick={read}
                    className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                  >
                    <AiOutlineBook />
                    <div>Read</div>
                  </button>
                  <button
                    className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                  >
                    <BsMic />
                    <div onClick={read}>Listen</div>
                  </button>
                </div>
                <div className="flex items-center gap-[8px] text-[#0365f2] font-semibold cursor-pointer mb-[40px] text-[18px] transition-color duration 200 ease-in-out">
                  <BiBookmark className="w-[20px]" />
                  <div>Add title to My Library</div>
                </div>
                <div className="font-extrabold mb-3">What's it about? </div>
                <div className="flex max-w-[420px] gap-3 mb-6">
                  {bookData?.tags.map((tag) => (
                    <div className="bg-[#f1f6f4] px-[16px] h-[48px] flex items-center cursor-not-allowed text-[#032b41] rounded-md">
                      {tag}
                    </div>
                  ))}
                </div>
                <p className="mb-6">{bookData?.bookDescription}</p>
                <p className="font-bold mb-6">About the author</p>
                <p>{bookData?.authorDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
