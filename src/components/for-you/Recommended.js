import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { Skelly } from "../Skelly";
import { app, auth } from "../../../firebase";
import { getPremiumStatus } from "../choose-plan/getPremiumStatus";
export default function Recommended() {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  // audio
  const durationsRef = useRef({});
  const [durations, setDurations] = useState({});
  const [isPremium, setIsPremium] = useState(false);

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
        `  https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended
        `
      );
      const data = await response.json();
      setBooksData(data);

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
      setLoading(false);
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

  console.log(booksData);
  return (
    <div className="mx-auto mb-10 ml-0 md:max-w-[1100px] md:w-[calc(100vw-400px)] w-[calc(100vw-100px)]">
      <h1 className="font-bold text-xl mb-2 mt-2">Recommended for you</h1>
      <h3 className="text-l  mt-2 mb-2"> We'll think you'll like these</h3>
      <div className="overflow-x-scroll flex max-w-[1200px] w-[100%]">
        {loading ? (
          new Array(8).fill("").map((book) => (
            <div className="relative pt-7 mx-3 min-w-[200px] pb-10">
              <Skelly width={200} height={100} />
              {/* <Skelly width={200} height={100} /> */}
              <Skelly width={200} height={100} />
              {/* <Skelly width={200} height={100} /> */}
              <div className="flex items-center gap-1">
                <Skelly width={200} height={100} />
              </div>
            </div>
          ))
        ) : (
          <>
            {booksData.map((book) => (
              <Link
                className="w-[230px] mx-4       
               hover:bg-gray-100
                transition duration-300 ease-in-out"
                href={"/book/" + book.id}
                key={book.id}
                bookData={book}
              >
                <div className="relative pt-7 mx-3 min-w-[200px] pb-10">
                  <img src={book.imageLink} className="w-[200px]" />
                  <h1 className="text-[16px] font-bold mb-[8px]">
                    {book.title}
                  </h1>
                  <h2 className="text-[14px] font-semibold mb-[8px] text-[#6b757b]">
                    {book.author}
                  </h2>
                  <h2 className="text-[14px] text-[#394547] mb-[8px]">
                    {book.subTitle}
                  </h2>
                  <div className="flex items-center gap-1">
                    <BsClock />
                    {formatTime(durations[book.id]) || "0:00"}
                    <AiOutlineStar />
                    {book.averageRating}
                  </div>
                  {book.subscriptionRequired && isPremium == false && (
                    <div className="absolute right-4 top-[0px] text-[12px] text-white bg-red-500 px-2 py-[1px] rounded-md">
                      Premium
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
