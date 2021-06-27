import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  playing,
  setPlaying,
}) => {
  useEffect(() => {
    const modifySongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(modifySongs);
    // eslint-disable-next-line
  }, [currentSong]);

  //Event Handler
  const playSongHandler = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(!playing)
      currentSong.active = false;
    } else {
      audioRef.current.play();
      setPlaying(!playing)
      currentSong.active = true;
    }
  };




  //state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    durationTime: 0,
  });

  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, durationTime: duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    //console.log(e.target.value
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min="0"
          type="range"
          onChange={dragHandler}
          value={songInfo.currentTime}
          max={songInfo.durationTime || 0}
        />
        <p>{getTime(songInfo.durationTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          onClick={() => skipTrackHandler("skip-backward")}
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={playing ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        onEnded={songEndHandler}
        onChange={songEndHandler}
        ref={audioRef}
        src={`${currentSong.audio}`}
      ></audio>
    </div>
  );
};

export default Player;
