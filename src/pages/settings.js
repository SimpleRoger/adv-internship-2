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
  const email = useSelector((state) => state.user.email);
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
      <div className="max-w-[600px] w-full flex flex-col ml-[300px] space-y-5">
        <h1 className="text-[30px] font-extrabold border-b border-gray-200">
          Settings
        </h1>

        {email == null ? (
          <div>
            <h1>Login to your account to see your details</h1>
          </div>
        ) : (
          <>
            <h2 className="text-[20px]">Your subscription plan</h2>
            {isPremium ? (
              <p>Premium</p>
            ) : (
              <p className="border-b border-gray-200 pb-5">Basic</p>
            )}
            {!isPremium ? (
              <Link href="/choose-plan">
                <button
                  className="bg-[#2bd97c] text-[#032b41] h-[40px] rounded-md text-[16px] min-w-[180px] border-b border-gray-200 
            pb-5 flex items-center justify-center pt-5"
                >
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
          </>
        )}
      </div>
    </>
  );
}
