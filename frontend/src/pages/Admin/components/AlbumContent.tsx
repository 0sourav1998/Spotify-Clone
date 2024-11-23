import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Album } from 'lucide-react'
import AlbumTable from './AlbumTable'
import ButtonDialogForAlbums from './ButtonDialogForAlbums'

const AlbumContent = () => {
  return (
    <Card className="bg-zinc-800/80 md:p-8 p-3  w-full">
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="flex gap-1 mb-1">
            <div className="flex items-center md:gap-2 gap-1 text-gray-100">
              <Album className="md:size-5 size-3 text-green-700"/>
              <span className='"md:text-xl text-sm"'>Albums Library</span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400 md:text-lg text-xs">Manage Your Music Library</CardDescription>
        </div>
        <ButtonDialogForAlbums/>
      </div>
    </CardHeader>
    <CardContent>
      <AlbumTable/>
    </CardContent>
  </Card>
  )
}

export default AlbumContent