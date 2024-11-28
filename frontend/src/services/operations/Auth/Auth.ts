import { toast } from "@/hooks/use-toast";
import apiConnector from "@/services/apiConnector";
import { authEndpoints } from "@/services/apis";

const { SIGN_IN_OUT } = authEndpoints;

type signInOrSignUpType = {
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  imageUrl: string | undefined | null;
};

export const signInOrSignUp = async (body: signInOrSignUpType) => {
  try {
    const res = await apiConnector({
      method: "POST",
      url: SIGN_IN_OUT,
      data: body,
    });
    if (res) {
      if(res.data.success){
        toast({
          title : "Logged In Successfully" ,
          description : `Welcome to Spotify , ${res.data.user.name}`,
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
};
