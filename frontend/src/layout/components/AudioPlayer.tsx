import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import { playNext } from "@/redux/slice/Music/PlayerStore";
import { useUser } from "@clerk/clerk-react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );
  const { socket } = useSelector((state: RootState) => state.socket);
  const { user } = useUser();
  const dispatch = useDispatch();


  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      if (isPlaying && socket && user?.id) {
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Listening to ${currentSong?.title}` },
        );
      }
    } else {
      audioRef.current?.pause();
      if (socket) {
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Idle` },
        );
      }
    }
  }, [isPlaying]);


  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      dispatch(playNext());
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [dispatch]);


  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
      if (isPlaying && socket && user?.id) {
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Listening to ${currentSong?.title}` },
        );
      }
    }
  }, [currentSong, isPlaying, socket, user?.id]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
