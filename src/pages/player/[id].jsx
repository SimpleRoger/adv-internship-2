import SearchBar from "@/components/for-you/SearchBar";
import Sidebar from "@/components/for-you/Sidebar";
import React, { useEffect, useState } from "react";
import AudioPlayer from "../../components/audio-player/AudioPlayer";

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id: id,
    },
  };
}
export default function Player({ id }) {
  const [bookData, setBookData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await response.json();
      setBookData(data);
      console.log(bookData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Sidebar audioPage={true} />
      <SearchBar />
      <div className=" pb-[100px] md:ml-[255px]">
        <div className="flex flex-col max-w-2xl  mx-auto">
          <h1 className="text-4xl margin-[#e1e7ea] mb-[32px] pb-[16px] border-b-2">
            {bookData?.title}
          </h1>
          <p className="whitespace-pre-line">{bookData?.summary}</p>
          <AudioPlayer bookData={bookData} />
        </div>
      </div>
    </>
  );
}
