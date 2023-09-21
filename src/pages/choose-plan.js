import React, { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { app } from "../../firebase";

import {
  getCheckoutUrl,
  getPremiumStatus,
} from "../components/choose-plan/stripePayment";

import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function choosePlan() {
  const router = useRouter();
  const auth = getAuth(app);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    console.log(isPremium);
  }, [app, auth.currentUser?.id]);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const checkOut = async () => {
    const priceId = "price_1NrZfqG0JjiKJbF2vtYajBhV";
    const checkOutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkOutUrl);
  };
  return (
    <div>
      <div className="bg-[#032b41] w-full h-full rounded-br-[16rem] rounded-bl-[16rem] text-white flex flex-col items-center gap-10 pt-10">
        <h1 className="text-4xl font-extrabold text-center">
          Get unlimited access to many amazing <br></br> books to read
        </h1>
        <h3>Turn ordinary moments into amazing learning opportunities</h3>
        <figure className="rounded-tl-[180px] rounded-tr-[180px] overflow-hidden">
          <img src="/assets/pricing-top.png" className="w-[400px]" />
        </figure>
      </div>
      <div className="max-w-[1070px] w-full mx-auto">
        <div className="flex gap-[20px] items-center justify-center mx-auto mt-10">
          <div className="flex flex-col items-center w-[300px] text-center">
            <HiDocumentText className="" size={80} />
            <p>Key ideas in few min with many books to read</p>
          </div>
          <div className="flex flex-col items-center w-[300px] text-center">
            <RiPlantFill size={80} />
            <p>3 million people growing with Summarist everyday</p>
          </div>
          <div className="flex flex-col items-center w-[300px] text-center">
            <FaHandshake size={80} />
            <p>Precise recommendations collections curated by experts</p>
          </div>
        </div>
        <div className="flex gap-10 flex-col w-full">
          <h1 className="text-center font-semibold text-[20px]">
            Choose the plan that fits you
          </h1>
          <div
            className="flex p-[24px] bg-[#f1f6f4] rounded-md max-w-[680px] mx-auto gap-[24px] w-full "
            onClick={() => handleButtonClick("option1")}
          >
            <div
              className={`w-[24px] h-[24px] border-black rounded-full border-2 ${
                selectedOption === "option1" ? "selected" : ""
              }`}
            ></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-extrabold">Premium Plus Yearly</h2>
              <h1 className="font-extrabold text-[28px]">$99.99/year</h1>
              <p>7-day free trial included</p>
            </div>
          </div>
          <div className="text-[#6b757b] max-w-[240px] flex justify-center mx-auto items-center gap-[8px] ">
            <div class="border-t border-solid border-black my-4 w-full"></div>
            <div className="text-center">or</div>
            <div class="border-t border-solid border-gray-300 my-4 w-full"></div>
          </div>
          <div
            className="flex p-[24px] bg-[#f1f6f4] rounded-md max-w-[680px] mx-auto gap-[24px] w-full"
            onClick={() => handleButtonClick("option2")}
          >
            <div
              className={`w-[24px] h-[24px] border-black rounded-full border-2 ${
                selectedOption === "option2" ? "selected" : ""
              }`}
            ></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-extrabold">Premium Monthly</h2>
              <h1 className="font-extrabold text-[28px]">$9.99/year</h1>
              <p>No trial included</p>
            </div>
          </div>
          <button onClick={checkOut}>Start your first month</button>
        </div>
      </div>
    </div>
  );
}
