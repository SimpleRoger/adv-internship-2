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
    <div>
      <Sidebar audioPlayer="valid" />
      <SearchBar />
      <div className="w-[100%]">
        <div className="flex flex-col max-w-4xl xl:ml-[300px] mx-auto">
          <h1 className="text-4xl margin-[#e1e7ea] mb-[32px] pb-[16px] border-b-2">
            {bookData?.title}
          </h1>
          <p>{bookData?.summary}</p>
          <Player bookData={bookData}/>
        </div>
      </div>
    </div>
  );
}
