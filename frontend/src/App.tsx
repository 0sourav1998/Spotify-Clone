import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import AuthCallbackPage from "./pages/Auth/AuthCallbackPage";
import { AuthenticateWithRedirectCallback, useUser } from "@clerk/clerk-react";
import MainComponent from "./layout/MainComponent";
import ChatPage from "./pages/Chat/ChatPage";
import Album from "./pages/Album/Album";
import AdminPage from "./pages/Admin/AdminPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket } from "./redux/slice/chat/socket";
import {
  updateOnlineUsers,
} from "./redux/slice/chat/chat";
import { resetPlayState } from "./redux/slice/Music/PlayerStore";
import {Playlist} from "./pages/Playlist/Playlist";

export default function App() {
  const { user  } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPlayState());
  }, [dispatch])


  useEffect(() => {
    if (user) {
      const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"
      const socketConnection = io(baseUrl);

      socketConnection.on("connect", () => {
        socketConnection.emit("user_connected", user.id);
        dispatch(setSocket(socketConnection));
      });

      socketConnection.on("users_online", (onlineUsers) => {
        dispatch(updateOnlineUsers(onlineUsers));
      });
    }
  }, [user]);


  
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/" element={<MainComponent />}>
        <Route index element={<Homepage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlist/:id" element={<Playlist/>}/>
      </Route>
      <Route />
    </Routes>
  );
}
