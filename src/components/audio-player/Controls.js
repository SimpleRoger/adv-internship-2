import { useEffect, useRef, useState, useCallback } from "react";
import { AiFillPlayCircle, AiOutlinePause } from "react-icons/ai";
import { TbRewindForward15, TbRewindBackward15 } from "react-icons/tb";

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

const Controls = ({ audioRef, progressBarRef, setTimeProgress, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  return (
    <div className="controls-wrapper">
      <div className="controls flex gap-5">
        <button onClick={skipBackward}>
          <TbRewindBackward15 size={28} />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <AiOutlinePause size={40} />
          ) : (
            <AiFillPlayCircle size={40} />
          )}
        </button>
        <button onClick={skipForward}>
          <TbRewindForward15 size={28}/>
        </button>
      </div>
    </div>
  );
};

export default Controls;
