import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";
import { SignInButton } from "./SignInButton";
import spotify from "../assets/spotify.png"

const Topbar = () => {
  const isAdmin: boolean = false;

  return (
    <div className="w-full p-3 flex justify-between items-center gap-4 shadow-sm shadow-white bg-zinc-950/75 text-bold font-bold ">
      <div className="flex flex-row gap-1 items-center">
        <img src={spotify} className="size-7"/>
        <div className="text-white shadow-sm ml-1 text-xl">Spotify</div>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className="flex gap-2 items-center justify-center bg-gray-200 rounded-md border-gray-200 p-2">
            <LayoutDashboardIcon className="w-5 h-5 mr-2" />
            <h1 className="text-gray-600">Admin Dashboard</h1>
          </Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
