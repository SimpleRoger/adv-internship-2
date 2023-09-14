import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className="bg-[#fff] border-b border-[#e1e7ea] h-[80px] z-1">
      <div className="flex items-center justify-between px-[32px] max-w-[1070px] mx-auto h-[100%]">
        <figure></figure>
        <div className="relative flex gap-[24px] max-w-[350px] w-[100%] mr-[200px]">
          <div className="flex items-center w-[100%]">
            <input
              className="items-center w-[600px] h-[40px] px-[16px] bg-[#f1f6f4] color-[#042330] rounded-[8px] border-[#e1e7ea] "
              type="text-value"
              placeholder="Search for books"
            />
            <div className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
              <AiOutlineSearch className="w-[40px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
