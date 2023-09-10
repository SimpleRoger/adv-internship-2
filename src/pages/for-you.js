import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBook from "../components/for-you/SelectedBook";
import Main from "../components/for-you/Main";
import SearchBar from "../components/for-you/SearchBar";
import Recommended from "../components/for-you/Recommended";

const inter = Inter({ subsets: ["latin"] });

export default function ForYou() {
  return (
    // <div className="flex flex-col items-center width-[100%]">
    <div className="flex flex-col width-[100%]">
      <Sidebar />
      <SearchBar />
      <div className="flex flex-col items-center width-[100%] max-w-[1070px] mx-auto">
        <SelectedBook />
        <Recommended />
      </div>
    </div>
  );
}
