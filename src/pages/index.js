import Image from "next/image";
import { Inter } from "next/font/google";

import Navbar1 from "@/components/Navbar1";
import Landing1 from "@/components/Landing1";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import SignUpModal from "@/components/SignUpModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SignUpModal />
      <AuthModal />
      <Navbar1 />
      <Landing1 />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </>
  );
}
