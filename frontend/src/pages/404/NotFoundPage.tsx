import { Home, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className='md:h-screen h-[85vh] bg-neutral-900 flex items-center justify-center'>
			<div className='text-center ms:space-y-8 md:px-4 space-y-4 px-2'>
				{/* Large animated musical note */}
				<div className='flex justify-center animate-bounce'>
					<Music2 className='md:h-24 md:w-24 h-12 w-12 text-emerald-500' />
				</div>

				{/* Error message */}
				<div className='space-y-4'>
					<h1 className='md:text-7xl text-3xl font-bold text-white'>404</h1>
					<h2 className='md:text-2xl text-cl font-semibold text-white'>Page not found</h2>
					<p className='text-neutral-400 max-w-md mx-auto'>
						Looks like this track got lost in the shuffle. Let's get you back to the music.
					</p>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center md:mt-8 mt-2'>
					<Button
						onClick={() => navigate(-1)}
						variant='outline'
						className='bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto'
					>
						Go Back
					</Button>
					<Button
						onClick={() => navigate("/")}
						className='bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto'
					>
						<Home className='mr-2 h-4 w-4' />
						Back to Home
					</Button>
				</div>
			</div>
		</div>
	);
}