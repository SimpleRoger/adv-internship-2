import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsClock } from "react-icons/bs";

export default function SuggestedBooks() {
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `  https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested
        `
      );
      const data = await response.json();
      setBooksData(data);
    }
    fetchData();
  }, []);
  console.log(booksData);
  return (
    <div className="mx-auto mb-10 max-w-[400px] ml-0 md:max-w-[1100px] w-[calc(100vw-400px)]">
      <h1 className="font-bold text-xl mb-2 mt-2">Suggested for you</h1>
      <h3 className="text-l  mt-2 mb-2"> We'll think you'll like these</h3>
      <div className="overflow-x-scroll flex max-w-[1200px] w-[100%]">
        {booksData.map((book) => (
          <Link
            className="w-[200px]"
            href={"/book/" + book.id}
            key={book.id}
            bookData={book}
          >
            <div className="relative pt-7 mx-3 min-w-[200px] pb-10">
              <img src={book.imageLink} className="w-[200px] " />
              <h1 className="text-[16px] font-bold mb-[8px]">{book.title}</h1>
              <h2 className="text-[14px] font-semibold mb-[8px] text-[#6b757b]">
                {book.author}
              </h2>
              <h2 className="text-[14px] text-[#394547] mb-[8px]">
                {book.subTitle}
              </h2>
              <div className="flex items-center gap-1">
                <BsClock />
                {book.duration}
                <AiOutlineStar />
                {book.averageRating}
              </div>
              {book.subscriptionRequired && (
                <div className="absolute right-4 top-[0px] text-[12px] text-white bg-red-500 px-2 py-[1px] rounded-md">
                  Premium
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
