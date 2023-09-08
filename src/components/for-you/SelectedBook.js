import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SelectedBook() {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`
      );
      const data = await response.json();
      setBookData(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      {bookData.map((book) => (
        <Link href={"/book/" + book.id} key={book.id} bookData={book}>
          {book.subscriptionRequired ? (
            <div className="bg-black w-fit h-[18px] px-2 absolute top-0 right-0 text-white text-xs flex items-center rounded-3xl">
              Premium
            </div>
          ) : (
            <div></div>
          )}
          <div className="ml-[300px]">
            <div className="mb-2 w-[172px] h-[172px]">
              <img src={book.imageLink} alt="bookImg" />
            </div>
            <div className="text-base font-bold text-black mb-2 ">
              {book.title}
            </div>
            <div className="text-sm text-gray-400 font-light mb-2  ">
              {book.author}
            </div>
            <div className="text-sm text-black mb-2 ">{book.subTitle}</div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-sm font-light text-gray-400 ">
                <div className="flex w-4 h-4 ">
                  {/* <AccessTimeRoundedIcon className="w-full h-full " /> */}
                </div>
                <div>03:24</div>
              </div>
              <div className="flex items-center gap-1 text-sm font-light text-gray-400">
                <div className="flex w-4 h-4 ">
                  {/* <StarOutlineOutlinedIcon className="w-full h-full" /> */}
                </div>
                <div>{book.averageRating}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
