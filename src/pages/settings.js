import React, { useEffect, useState } from "react";
import Searchbar from "../components/for-you/SearchBar";
import Sidebar from "../components/for-you/Sidebar";
import { useSelector } from "react-redux";
import { getPortalUrl } from "../components/choose-plan/stripePayment";
import { app, auth } from "../../firebase";
import { Router, useRouter } from "next/router";
import { getPremiumStatus } from "../components/choose-plan/getPremiumStatus";
import Link from "next/link";

export default function settings() {
  const user = useSelector((state) => state.user);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
      console.log(newPremiumStatus);
      // console.log(await getPremiumStatus(app));
    };
    checkPremium();
    // console.log(isPremium);
  }, [auth.currentUser]);
  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
  };
  return (
    <>
      <Sidebar />
      <Searchbar />
      <div className="max-w-[1080px] w-full flex flex-col items-center mx-auto">
        <h1>Settings</h1>
        <h2>Your subscription plan</h2>
        {isPremium ? <p>Premium</p> : <p>Basic</p>}
        {!isPremium ? (
          <Link href="/choose-plan">
            <button className="bg-[#2bd97c] text-[#032b41] h-[40px] rounded-md text-[16px] min-w-[180px]">
              Upgrade to Premium
            </button>
          </Link>
        ) : (
          <button
            className="bg-[#2bd97c] text-[#032b41] h-[40px] rounded-md text-[16px] min-w-[180px]"
            onClick={manageSubscription}
          >
            Manage subscription
          </button>
        )}
        <h1>Email</h1>
        <h2>{user.email}</h2>
      </div>
    </>
  );
}
