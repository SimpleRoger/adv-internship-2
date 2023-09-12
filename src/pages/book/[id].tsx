import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Book } from "../../../types";
import { GetServerSidePropsContext } from "next";
import { BiBookmark, BiStar } from "react-icons/bi";
import {
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineClockCircle,
} from "react-icons/ai";
import Sidebar from "/Users/rogertan/front-end-simplified/adv_intern_3/src/components/for-you/Sidebar.js";
import SearchBar from "/Users/rogertan/front-end-simplified/adv_intern_3/src/components/for-you/SearchBar.js";
import { BsFillBookmarkFill, BsFillBookmarkXFill, BsMic } from "react-icons/bs";
import { RiBookMarkLine } from "react-icons/ri";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;
  return {
    props: {
      id: id,
    },
  };
}

interface BookProps {
  id: string;
}
export default function Book({ id }: BookProps): JSX.Element {
  const [bookData, setBookData] = useState<Book>();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await response.json();
      setBookData(data);
      // console.log(id);
      // console.log(data);
      console.log(bookData);
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col width-[100%] ml-[200px]">
      <SearchBar />
      <Sidebar />
      <div className="max-w-[1070px] w-[100%] mx-auto p-2">
        <div className="width-[100%]">
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
                  <div>Read</div>
                </button>
                <button
                  className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
                text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
                transition-opacity duration-200 ease-in-out"
                >
                  <BsMic />
                  <div>Listen</div>
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
        </div>
      </div>
    </div>
  );
}
