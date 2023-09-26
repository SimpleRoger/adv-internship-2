import Router from "next/router";
import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await response.json();
      setBookData(data);
      console.log(bookData);
      setLoading(false);
    }
    fetchData();
  }, []);

  //read function
  function read() {
    if (!email) {
      dispatch(openLogInModal());
    } else if (
      bookData?.subscriptionRequired == true &&
      subscribed != "basic"
    ) {
      console.log(bookData?.subscriptionRequired);
      console.log(subscribed);
      router.push("/choose-plan"); // Replace '/new-route' with the actual path.
    } else {
      router.push(`/player/${id}`); // Replace '/new-route' with the actual path.
    }
  }
  //listen function
  function listen() {
    if (!email) {
      dispatch(openLogInModal());
    }
  }
  return (
    <div className="flex flex-col width-[100%] ml-[200px] md:ml-[300px]">
      <SearchBar />
      <Sidebar />
      {/* <AuthModal />  */}
      <div className="max-w-[1070px] w-[100%] mx-auto p-2">
        <div className="width-[100%]">
          {loading ? (
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
            </div>
          ) : (
            <div className="flex gap-[16px]">
              {/* main */}
              <div className="flex flex-col w-[100%] min-w-[500px]">
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
                      <p>({bookData?.totalRating}) ratings</p>
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
                <div className="flex gap-[16px] mb-[24px]">
                  <button
                    className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out"
                  >
                    <AiOutlineBook />
                    <div onClick={read}>Read</div>
                  </button>
                  <button
                    className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out"
                  >
                    <BsMic />
                    <div onClick={listen}>Listen</div>
                  </button>
                </div>
                <div className="flex items-center gap-[8px] text-[#0365f2] font-semibold cursor-pointer mb-[40px] text-[18px] transition-color duration 200 ease-in-out">
                  <BiBookmark className="w-[20px]" />
                  <div>Add title to My Library</div>
                </div>
                <div className="font-extrabold">What's it about? </div>
                <div className="flex max-w-[420px] gap-3">
                  {bookData?.tags.map((tag) => (
                    <div className="bg-[#f1f6f4] px-[16px] h-[48px] flex items-center cursor-not-allowed text-[#032b41] rounded-md">
                      {tag}
                    </div>
                  ))}
                </div>
                <p>{bookData?.bookDescription}</p>
                <p className="font-bold">About the author</p>
                <p>{bookData?.authorDescription}</p>
              </div>
              <div>
                <img
                  src={bookData?.imageLink}
                  className="w-[300px] min-w-[300px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
