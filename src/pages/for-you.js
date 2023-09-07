import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBook from "../components/for-you/SelectedBook";


const inter = Inter({ subsets: ["latin"] });

export default function ForYou() {
  return (
    <>
      <Sidebar />
      <SelectedBook />
    </>
  );
}
