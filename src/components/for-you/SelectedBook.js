import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skelly } from "../Skelly";
import { BsClock } from "react-icons/bs";
import { AiFillPlayCircle, AiOutlineStar } from "react-icons/ai";
export default function SelectedBook() {
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState([]);
  const [duration, setDuration] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`
      );
      const data = await response.json();
      setBookData(data);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="mx-auto mb-10 ml-0 md:max-w-[1100px] md:w-[calc(100vw-400px)] w-[calc(100vw-100px)]">
      {loading ? (
        <>
          <h1 className="font-bold text-xl mb-2 mt-2">Selected just for you</h1>
          <Skelly width={500} height={200} />
        </>
      ) : (
        bookData.map((book) => (
          <div className=" mb-[50px] xl:w-[700px]">
            <h1 className="font-bold text-xl mb-2 mt-2">
              Selected just for you
            </h1>
            {loading ? (
              <Skelly width={500} height={200} />
            ) : (
              <Link href={"/book/" + book.id} key={book.id} bookData={book}>
                <div className="flex bg-slate-200 w-[100%] flex-col lg:flex-row p-5">
                  <div className="text-sm text-black mb-2  w-[40%] lg:border lg:border-r-gray-300">
                    {book.subTitle}
                  </div>
                  <div className="mb-2 w-[172px] h-[172px] px-5">
                    <img src={book.imageLink} alt="bookImg" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-black mb-2 ">
                      {book.title}
                    </div>
                    <div className="text-sm text-gray-400 font-light mb-2  ">
                      {book.author}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 text-sm font-light ">
                        <AiFillPlayCircle size={50} className="text-black"/>
                        <div>3 mins 23 seconds</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// {book.subscriptionRequired ? (
//   <div className="bg-black w-fit h-[18px] px-2 absolute top-0 right-0 text-white text-xs flex rounded-3xl">
//     Premium
//   </div>
// ) : (
//   <div></div>
// )}
