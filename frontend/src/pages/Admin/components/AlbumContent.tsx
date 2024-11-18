import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ButtonDialog from './ButtonDialog'
import { Album } from 'lucide-react'
import AlbumTable from './AlbumTable'
import ButtonDialogForAlbums from './ButtonDialogForAlbums'

const AlbumContent = () => {
  return (
    <Card className="bg-zinc-800/80 p-8 w-full">
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="flex gap-1 mb-1">
            <div className="flex gap-2 text-gray-100">
              <Album className="size-5 text-green-700"/>
              Albums Library
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400">Manage Your Music Library</CardDescription>
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