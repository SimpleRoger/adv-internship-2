import React, { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { app } from "../../firebase";
import { SlArrowDown } from "react-icons/sl";
import { AiOutlineLoading } from "react-icons/ai";

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
  const [priceId, setPriceId] = useState("price_1NrZfqG0JjiKJbF2vtYajBhV");
  const [isPremium, setIsPremium] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(false);

  const sections = [
    {
      title: "How does the free 7-day trial work?",
      content:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      title:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      content:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "What's included in the Premium plan?",
      content:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      title: "Can I cancel during my trial or subscription?",
      content:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  const toggleSection = (index) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === index ? null : index
    );
  };

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(true);
    };
    console.log(isPremium);
  }, [app, auth.currentUser?.id]);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    if (option == "option1") {
      setPriceId("price_1NrZfqG0JjiKJbF2vtYajBhV");
    } else {
      setPriceId("price_1NuTWVG0JjiKJbF2X7DRLqrF");
    }
  };

  const checkOut = async () => {
    setLoading(true);
    const checkOutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkOutUrl);
    setLoading(false);
  };
  return (
    <div className="">
      <div className="bg-[#032b41] w-full h-full rounded-br-[16rem] rounded-bl-[16rem] text-white flex flex-col items-center gap-10 pt-10">
        <h1 className="text-4xl font-extrabold text-center">
          Get unlimited access to many amazing <br></br> books to read
        </h1>
        <h3>Turn ordinary moments into amazing learning opportunities</h3>
        <figure className="rounded-tl-[180px] rounded-tr-[180px] overflow-hidden">
          <img src="/assets/pricing-top.png" className="w-[400px]" />
        </figure>
      </div>
      <div className="max-w-[1070px] w-full mx-auto relative min-h-screen">
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
            className="flex p-[24px] bg-[#f1f6f4] rounded-md max-w-[680px] mx-auto gap-[24px] w-full border-4 border-[#bac8ce] "
            onClick={() => handleButtonClick("option1")}
          >
            <div
              className={`w-[24px] h-[24px] border-black rounded-full border-2 relative`}
            >
              <div
                className={`${selectedOption === "option1" ? "selected" : ""}`}
              ></div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-extrabold">Premium Plus Yearly</h2>
              <h1 className="font-extrabold text-[28px]">$99.99/year</h1>
              <p>7-day free trial included</p>
            </div>
          </div>
          {/* <div className="text-[#6b757b] max-w-[240px] flex justify-center mx-auto items-center gap-[8px] "> */}
          {/* <div class="border-t border-solid border-black my-4 w-full"></div> */}
          <div class="text-center w-full">
            <div class="relative inline-block w-full">
              <span class=" px-2 py-1 text-gray-700">or</span>
              <span class="absolute top-1/2 left-[calc(23%)] w-1/4 h-[1px] bg-gray-400"></span>
              <span class="absolute top-1/2 right-[calc(23%)] w-1/4 h-[1px] bg-gray-400"></span>
            </div>
            {/* </div>{" "} */}
            {/* <div class="border-t border-solid border-gray-300 my-4 w-full"></div> */}
          </div>
          <div
            className="flex p-[24px] bg-[#f1f6f4] rounded-md max-w-[680px] mx-auto gap-[24px] w-full border-4 border-[#bac8ce]"
            onClick={() => handleButtonClick("option2")}
          >
            <div
              className={`w-[24px] h-[24px] border-black rounded-full border-2 relative`}
            >
              <div
                className={`${selectedOption === "option2" ? "selected" : ""}`}
              ></div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-extrabold">Premium Monthly</h2>
              <h1 className="font-extrabold text-[28px]">$9.99/year</h1>
              <p>No trial included</p>
            </div>
          </div>
        </div>
        <div className="sticky bottom-[0] h-[150px] flex justify-center items-center flex-col gap-[20px] pt-[10px] z-10 bg-white">
          <button
            className=" text-[18px] p-2 w-[300px] h-[40px] mx-auto bg-[#2bd97c] rounded-md flex justify-center"
            onClick={checkOut}
            disabled={loading}
          >
            {" "}
            {loading ? (
              <AiOutlineLoading className="animate-spin text-center" />
            ) : selectedOption === "option1" ? (
              "Start your 7-day free trial"
            ) : (
              "Start your first month"
            )}
          </button>
          <p className="mx-auto max-w-xl mb-5 text-xs">
            Cancel your trial at any time before it ends, and you won’t be
            charged.
          </p>
        </div>
        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleSection(index)}
              className={`w-full p-2 text-left border rounded items-center flex justify-between transition-all duration-300${
                openSection === index ? "bg-gray-200" : "bg-gray-100 "
              }`}
            >
              <div className="text-[28px] font-extrabold">{section.title}</div>
              <span
                className={`transform justify-end transition-all duration-300 ${
                  openSection === index ? "rotate-180" : "rotate-0"
                }`}
              >
                <SlArrowDown />
              </span>
            </button>
            {openSection === index && (
              <div className="p-4 bg-gray-100 transition-all duration-300">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
