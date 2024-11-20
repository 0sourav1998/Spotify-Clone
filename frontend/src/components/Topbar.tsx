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

const Topbar = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { isUserAdmin } = useSelector((state: RootState) => state.user);
  

  const fetchIsAdminOrNot = async () => {
    const token = await getToken();
    const res = await isUserAdminFunction(token);
    console.log(res)
    dispatch(setUserIsAdmin(res));
  };


  useEffect(() => {
    fetchIsAdminOrNot();
  }, [user]);

  const isAdmin: boolean = isUserAdmin;

  return (
    <div className="w-[99%] mx-auto rounded-md p-3 flex  justify-between items-center gap-4 border border-gray-700 bg-zinc-800/75 text-bold font-bold">
      <div className="flex flex-row gap-1 items-center">
        <img src={spotify} className="size-7" />
        <div className="text-white shadow-sm ml-1 text-xl">Spotify</div>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex gap-2 items-center justify-center bg-gray-900 hover:bg-gray-950 transition-all duration-300 rounded-md border-gray-200 p-2"
          >
            <LayoutDashboardIcon className="w-5 h-5 mr-2 text-white" />
            <h1 className="text-gray-50">Admin Dashboard</h1>
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
