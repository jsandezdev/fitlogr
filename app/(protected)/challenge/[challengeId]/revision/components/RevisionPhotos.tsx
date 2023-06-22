'use client'

import { Revision } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { PhotoType } from '@/lib/config'

const photoTypes = [
  { id: PhotoType.front, title: 'Delante', value: undefined },
  { id: PhotoType.side, title: 'Lateral', value: undefined },
  { id: PhotoType.back, title: 'Detrás', value: undefined }
]

interface Props {
  revision: Revision
}

export const RevisionPhotos = ({ revision } : Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadFile = async (e: any, photoType: PhotoType) => {
    const file = e.target.files[0]

    if (file !== undefined) {
      setIsLoading(true)
      e.target.value = null

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'bmrlavgp')

      const response = await fetch('https://api.cloudinary.com/v1_1/dsnui81gh/image/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response?.ok) {
        setIsLoading(false)

        return toast({
          title: 'Algo ha ido mal.',
          description: 'La imagen no ha podido añadirse. Por favor, inténtalo de nuevo.',
          variant: 'destructive'
        })
      }

      const data = {
        type: photoType,
        url: result.secure_url
      }

      const apiResponse = await fetch(`/api/challenge/${revision.challengeId}/revision/${revision.id}/photo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!apiResponse?.ok) {
        setIsLoading(false)

        return toast({
          title: 'Algo ha ido mal.',
          description: 'La imagen no ha podido añadirse. Por favor, inténtalo de nuevo.',
          variant: 'destructive'
        })
      }

      revision[photoType + 'Photo'] = result.secure_url

      toast({
        title: 'Imagen añadida correctamente.'
      })

      setIsLoading(false)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Fotos</h3>
      <p className='text-md text-gray-500 mb-2'></p>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        { photoTypes.map((photoType) => (
          <div key={`photoType_${photoType.id}`}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={PhotoType[photoType.id]}>{photoType.title}</Label>
              { revision[photoType.id + 'Photo'] && (
                <Image
                  src={revision[photoType.id + 'Photo']}
                  alt={photoType.title}
                  className="rounded-md object-cover"
                  width={768}
                  height={920}
                  fetchPriority='low'
                />
              )}
              <Input
                type="file"
                id={PhotoType[photoType.id]}
                onChange={(e) => uploadFile(e, PhotoType[photoType.id])}
                value={photoTypes.find((p) => p.id === photoType.id)?.value}
                disabled={isLoading}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
