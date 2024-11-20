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

  // Handle play/pause logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      if (isPlaying && socket && user?.id) {
        console.log("Emitting user activity...");
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Listening to ${currentSong?.title}` },
          (response: any) => {
            console.log("Emit acknowledgment:", response);
          }
        );
      }
    } else {
      audioRef.current?.pause();
      console.log("Emitting user activity...");
      if (socket) {
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Idle` },
          (response: any) => {
            console.log("Emit acknowledgment:", response);
          }
        );
      }
    }
  }, [isPlaying]);

  // Handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      dispatch(playNext()); // Dispatch the playNext action
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [dispatch]);

  // Handle song changes
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
        console.log("Emitting user activity...");
        socket.emit(
          "update_activity",
          { userId: user?.id, activity: `Listening to ${currentSong?.title}` },
          (response: any) => {
            console.log("Emit acknowledgment:", response);
          }
        );
      }
    }
  }, [currentSong, isPlaying, socket, user?.id]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
