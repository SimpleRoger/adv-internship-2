import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import React, { useRef, useState } from "react";

const AudioPlayer = ({ bookData }) => {
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  // <audio src=" " controls />
  const audioRef = useRef();
  const song = {
    title: bookData?.title,
    src: bookData?.audioUrl,
    author: bookData?.author,
    thumbnail: bookData?.imageLink,
  };
  //   export const tracks = [
  //    ,
  //     // ...
  //   ];

  return (
    <div className="">
      <div className="flex items-center justify-evenly fixed bottom-0 mt-auto bg-[#042330] w-[100%] left-0 text-white">
        {/* {audio.audio} */}
        <DisplayTrack
          song={bookData}
          audioRef={audioRef}
          setDuration={setDuration}
          progressBarRef={progressBarRef}
        />
        <Controls audioRef={audioRef} 
        progressBarRef={progressBarRef}
        setTimeProgress={setTimeProgress}
        duration={duration}
        />
        <ProgressBar
          progressBarRef={progressBarRef}
          audioRef={audioRef}
          timeProgress={timeProgress}
          duration={duration}
        />
      </div>
    </div>
  );
};
export default React.forwardRef(AudioPlayer);
