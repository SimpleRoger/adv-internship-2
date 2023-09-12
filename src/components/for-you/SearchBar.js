import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className="bg-[#fff] border-b border-[#e1e7ea] h-[80px] z-1">
      <div className="flex items-center justify-between px-[32px] max-w-[1070px] mx-auto h-[100%]">
        <figure></figure>
        <div className="flex gap-[24px] max-w-[32px] w-[100%]">
          <div className="flex items-center w-[100%]">
            <input
              className="items-center w-[400px] h-[40px] px-[16px] bg-[#f1f6f4] color-[#042330] rounded-[8px] border-[#e1e7ea]"
              type="text-value"
              placeholder="Search for books"
            />
            <div>
              <AiOutlineSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
