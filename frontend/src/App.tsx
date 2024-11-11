import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import AuthCallbackPage from "./pages/Auth/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainComponent from "./layout/MainComponent";
import ChatPage from "./pages/Chat/ChatPage";

export default function App() {
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
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/" element={<MainComponent />}>
        <Route index element={<Homepage />} />
        <Route path="/chat" element={<ChatPage/>}/>
      </Route>
      <Route />
    </Routes>
  );
}
