import React from "react";
import { HiDocumentText } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
export default function choosePlan() {
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
        <div>
            <h1>Choose the plan that fits you</h1>
        </div>
      </div>
    </div>
  );
}
