import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import React, { useRef, useState } from 'react';

const AudioPlayer = (audio) => {
    // <audio src=" " controls />
    const audioRef = useRef(null);

  return (
    <div className="">
      <div className="">
        {audio.audio}
        <DisplayTrack audio={audio.audio} audioRef={audioRef}/>
        <Controls audioRef={audioRef}/>
        <ProgressBar />
      </div>
    </div>
  );
};
export default React.forwardRef(AudioPlayer);
