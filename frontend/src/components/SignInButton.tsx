import { useSignIn } from '@clerk/clerk-react';
import { Button } from './ui/button';
import Google from "../assets/google.png"

export const SignInButton = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl : "/sso-callback",
      redirectUrlComplete : "/auth-callback"

    });
  };

  return (
    <Button 
      onClick={signInWithGoogle} 
      variant="secondary" 
      className="w-full h-11 border-zinc-200 text-gray-200 shadow-gray-50 bg-zinc-900 hover:bg-zinc-950 transition-all duration-300"
    >
      
     <img src={Google} className='size-7'/> <span className='hidden md:flex'>Continue With Google</span>
    </Button>
  );
};
