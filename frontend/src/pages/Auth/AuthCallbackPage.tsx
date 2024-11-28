import { Card, CardContent } from "@/components/ui/card";
import { signInOrSignUp } from "@/services/operations/Auth/Auth";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const authFunction = async () => {
    if (user) {
      const obj = {
        id: user.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
      };
      await signInOrSignUp(obj);
      navigate("/")
    }
  };
  useEffect(() => {
    authFunction();
  }, [navigate, user]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center mt-6">
          <Loader className="size-6 animate-spin text-emerald-500" />
          <h3 className="text-zinc-400 text-xl font-bold mt-4">
            Logging You In
          </h3>
          <p className="text-sm font-semibold mt-3 text-zinc-300">
            Redirecting...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
