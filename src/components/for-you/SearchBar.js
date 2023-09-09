import React from "react";
import { AiOutlineSearch } from "react-icons/ai";


export default function SearchBar() {
  return (
    <div className="w-[100%] h-[80px] border border-black-500 ml-[240px] items-center flex">
      <div className="flex xl:ml-[60%] md:ml-[30%] items-center">
        <input className="items-center" type="text-value" placeholder="Search for books"/>
        <div>
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
}
