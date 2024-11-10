import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import AuthCallbackPage from "./pages/Auth/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
      <Route />
    </Routes>
  );
}
