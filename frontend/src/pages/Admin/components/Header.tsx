import spotify from "../../../assets/spotify.png";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-800 via-blue-900 to-green-900 shadow-lg rounded-md mb-4">
        <Link to={"/"} className="flex items-center gap-3">
          <img
            src={spotify}
            alt="Spotify Logo"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            Spotify
          </span>
        </Link>

      <div className="flex items-center gap-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 rounded-full border-2 border-white shadow-md",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
