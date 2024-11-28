import { Button } from "@/components/ui/button";
import Slider from "@mui/material/Slider";
import { RootState } from "@/main";
import {
  playNext,
  playPrevious,
  setIsPlaying,
  togglePlay,
} from "@/redux/slice/Music/PlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlaybackControls = () => {
  const dispatch = useDispatch();

  const formatDuration = (time: number) => {
    if (time >= 60) {
      time = Math.floor(time);
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; 
    } else {
      return `0:${time < 10 ? "0" : ""}${time}`; 
    }
  };

  const { isPlaying, currentSong } = useSelector(
    (state: RootState) => state.player
  );
  const [volume, setVolume] = useState<number>(50);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  let audioRef = useRef<HTMLAudioElement | null>(null);


  const handleVolume = (value: number | number[]) => {
    if (audioRef.current && typeof value === "number") {
      audioRef.current.volume = value / 100;
      setVolume(value);
    }
  };

  const handleSeek = (value: number | number[]) => {
    if (audioRef.current && typeof value === "number") {
      audioRef.current.currentTime = value;
    }
  };

  useEffect(() => {
    const handleTime = () => {
      if (!audioRef.current) return;
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    };
    const handleDuration = () => {
      if (!audioRef.current) return;
      setDuration(audioRef.current.duration);
    };

    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;

    audio?.addEventListener("timeupdate", handleTime);
    audio?.addEventListener("loadedmetadata", handleDuration);

    return () => {
      audio?.removeEventListener("timeupdate", handleTime);
      audio?.removeEventListener("loadedmetadata", handleDuration);
    };
  }, [currentSong, isPlaying]);

  const repeatSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      dispatch(setIsPlaying())
      audioRef.current.play();
    }
  };

  return (
    <footer className="flex sm:flex-row flex-col sm:items-center justify-between w-full bg-zinc-950 shadow-md md:p-2 p-2 sticky bottom-0 z-10">
      <div className="p-1 flex items-center justify-center shadow-md shadow-white mb-4 sm:mb-0 sm:shadow-none">
        {currentSong && (
          <div className="flex flex-row items-center p-2 gap-4 min-w-[60%]">
            <img src={currentSong.imageUrl} className="md:size-12 size-10 rounded-md" />
            <div className="flex flex-col">
              <div className="text-gray-200 md:text-xl text-sm font-semibold">
                {currentSong.title.length > 10 ? currentSong.title.substring(0,10) + "..." : currentSong.title}
              </div>
              <p className="text-gray-500 md:text-sm text-xs">{currentSong.artist}</p>
            </div>
          </div>
        )}
        <div className="flex sm:hidden items-center gap-2 w-full justify-start">
          <Button variant={"ghost"}>
            <Volume className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Slider
            size="small"
            defaultValue={70}
            value={volume}
            onChange={(_, newValue) => handleVolume(newValue)}
            aria-label="Small"
            step={10}
            valueLabelDisplay="auto"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-4 items-center">
        <div className="flex sm:gap-4 gap-1.5 items-center">
          <Button
            onClick={repeatSong}
            disabled={!currentSong}
            className="bg-gray-800 hover:bg-gray-900 transition-all duration-200 size-8 sm:size-12"
            variant={"ghost"}
          >
            <Repeat className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Button
            disabled={!currentSong}
            className="bg-gray-800 hover:bg-gray-900 transition-all duration-200 size-8 sm:size-12"
            variant={"ghost"}
            onClick={() => dispatch(playPrevious())}
          >
            <SkipBack className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Button
            disabled={!currentSong}
            className="bg-gray-800 hover:bg-gray-900 transition-all duration-200 size-8 sm:size-12"
            variant={"ghost"}
            onClick={() => dispatch(togglePlay())}
          >
            {isPlaying ? (
              <Pause className="text-gray-200 hover:scale-105 transition-all duration-200" />
            ) : (
              <Play className="text-gray-200 hover:scale-105 transition-all duration-200" />
            )}
          </Button>
          <Button
            disabled={!currentSong}
            className="bg-gray-800 hover:bg-gray-900 transition-all duration-200 size-8 sm:size-12"
            variant={"ghost"}
            onClick={() => dispatch(playNext())}
          >
            <SkipForward className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
        </div>
        <div className="flex items-center gap-4 w-full">
          <p className="text-xs text-zinc-400">{formatDuration(currentTime)}</p>
          <Slider
            value={currentTime}
            max={duration || 100}
            step={1}
            className="w-full hover:cursor-grab active:cursor-grabbing"
            onChange={(_, newValue) => handleSeek(newValue)}
          />
          <p className="text-xs text-zinc-400">{formatDuration(duration)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mr-2 min-w-[10%]">
        <div className="hidden md:flex">
        <Button variant={"ghost"}>
            <Mic2 className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Button variant={"ghost"}>
            <ListMusic className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Button variant={"ghost"}>
            <Laptop2 className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
        </div>
        <div className="hidden sm:flex flex-col md:flex-row items-center gap-0.5 w-full justify-end">
          <Button variant={"ghost"}>
            <Volume className="text-gray-200 hover:scale-105 transition-all duration-200" />
          </Button>
          <Slider
            size="small"
            defaultValue={70}
            value={volume}
            onChange={(_, newValue) => handleVolume(newValue)}
            aria-label="Small"
            step={10}
            valueLabelDisplay="auto"
            className="w-full"
          />
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
