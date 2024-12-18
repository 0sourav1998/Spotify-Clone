import { LayoutDashboardIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { SignInButton } from "./SignInButton";
import spotify from "../assets/spotify.png";
import { isUserAdminFunction } from "@/services/operations/User/User";
import { useDispatch, useSelector } from "react-redux";
import { setUserIsAdmin } from "@/redux/slice/User/User";
import { RootState } from "@/main";

const TopBar = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { isUserAdmin } = useSelector((state: RootState) => state.user);
  

  const fetchIsAdminOrNot = async () => {
    const token = await getToken();
    const res = await isUserAdminFunction(token);
    dispatch(setUserIsAdmin(res));
  };


  useEffect(() => {
    fetchIsAdminOrNot();
  }, [user]);

  const isAdmin: boolean = isUserAdmin;

  return (
    <div className="md:w-[99%] w-full mx-auto rounded-md p-3 flex  justify-between items-center gap-4 border border-gray-700 bg-zinc-800/75 text-bold font-bold">
      <div className="flex flex-row gap-1 items-center">
        <img src={spotify} className="size-4 md:size-7" />
        <div className="text-white shadow-sm ml-1 md:text-xl text-lg">Spotify</div>
      </div>
      <div className="flex items-center md:gap-4 gap-2">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex gap-2 items-center justify-center bg-gray-900 hover:bg-gray-950 transition-all duration-300 rounded-md border-gray-200 md:p-2 p-2"
          >
            <LayoutDashboardIcon className="md:w-5 md:h-5 w-4 h-4 mr-2 text-white" />
            <p className="text-gray-400 md:text-lg text-[8px]">Admin Dashboard</p>
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

export default TopBar;
