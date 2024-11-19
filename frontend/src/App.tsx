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
  updateUserActivities,
} from "./redux/slice/chat/chat";

export default function App() {
  const { user } = useUser();
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketConnection = io("http://localhost:4000");
      // console.log(socketConnection);

      socketConnection.on("connect", () => {
        socketConnection.emit("user_connected", user.id);
        dispatch(setSocket(socketConnection));
      });

      socketConnection.on("users_online", (onlineUsers) => {
        console.log("onlineUsers",onlineUsers)
        dispatch(updateOnlineUsers(onlineUsers));
      });

      socketConnection.on("user_activities", (updateActivities) => {
        dispatch(updateUserActivities(updateActivities));
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
      </Route>
      <Route />
    </Routes>
  );
}
