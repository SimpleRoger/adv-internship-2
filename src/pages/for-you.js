import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBook from "../components/for-you/SelectedBook";
import Main from "../components/for-you/Main";
import SearchBar from "../components/for-you/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export default function ForYou() {
  return (
    <>
      <SearchBar />
      <Sidebar />
      <SelectedBook />
      <Main />
    </>
  );
}
