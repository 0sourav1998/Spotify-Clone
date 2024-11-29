import { HeadphonesIcon } from 'lucide-react';

export const LoginPrompt = () => (
	<div className='h-[70%] flex flex-col items-center justify-center md:p-6 p-2 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-zinc-900 rounded-full md:p-4 p-2'>
				<HeadphonesIcon className='md:size-8 size-4 text-emerald-400' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='md:text-lg text-xs md:font-semibold font-normal text-white'>See What Friends Are Playing</h3>
			<p className='md:text-sm text-[8px] text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);