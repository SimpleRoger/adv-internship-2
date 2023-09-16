import { BsMusicNoteBeamed } from "react-icons/bs";

const DisplayTrack = ({ song, audioRef, setDuration, progressBarRef }) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

//   const repeat = () => {
//     // audioRef.current.duration = 0;

//   };

  return (
    <div>
      <div>
        <audio
          src={song?.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        //   onEnded={repeat}
        />
        <div className="audio-info flex items-center">
          <div className="audio-image">
            {song?.imageLink ? (
              <img src={song?.imageLink} className="w-[100px]" alt="audio avatar" />
            ) : (
              <div className="icon-wrapper">
                <span className="audio-icon">
                  <BsMusicNoteBeamed />
                </span>
              </div>
            )}
          </div>
          <div className="text">
            <p className="title">{song?.title}</p>
            <p>{song?.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
