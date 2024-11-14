import { RootState } from '@/main'
import { setCurrentSong, togglePlay } from '@/redux/slice/Music/PlayerStore'
import { Song } from '@/types'
import { Pause, Play } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AudioPlayerFeatured = ({song} : {song : Song}) => {
    const {isPlaying,currentSong} = useSelector((state:RootState)=>state.player);
    const isCurrentSong = currentSong?._id === song._id ;
    const dispatch = useDispatch();

    const handlePlayPause = ()=>{
        if(isPlaying) dispatch(togglePlay());
        else dispatch(setCurrentSong(song))
    }

  return (
    <div className='absolute bottom-4 right-3' onClick={handlePlayPause}>
        {
            isPlaying && isCurrentSong ? (<Pause size={28} className='bg-blue-500 hidden group-hover:flex text-gray-50 rounded-md p-1.5'/>) : (<Play size={28} className='bg-blue-500 hidden group-hover:flex text-gray-50 rounded-md p-1.5'/>)
        }
    </div>
  )
}

export default AudioPlayerFeatured