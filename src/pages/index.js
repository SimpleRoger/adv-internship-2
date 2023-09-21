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
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  if (user.email != null) {
    router.push("/for-you");
  }
  return (
    <>
      <SignUpModal />
      <AuthModal />
      <Navbar1 />
      <div className=" mx-auto max px-auto items-center flex flex-col">
        <Landing1 />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
      </div>
    </>
  );
}
