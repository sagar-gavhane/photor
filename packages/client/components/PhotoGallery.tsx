import React, { useEffect, useState, SFC } from 'react'
import { getImages } from 'services/api'

import { Photo } from 'types'

import PhotoThumbnail from './PhotoThumbnail'

const PhotoGallery: SFC = (props) => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const photos: Photo[] = await getImages()
      const nextPhotos = photos.map((photo) => {
        return {
          ...photo,
          thumbnail_url: `https://picsum.photos/id/${photo.id}/150/150`,
        }
      })
      setPhotos(nextPhotos)
    }

    fetchImages()
  }, [])

  return (
    <div className="photo-gallery">
      {photos.map((photo: Photo) => (
        <PhotoThumbnail key={photo.id} photo={photo} />
      ))}
    </div>
  )
}

export default PhotoGallery
