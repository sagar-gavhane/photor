import React, { SFC } from 'react'
import { useDrag } from 'react-dnd'

import { Photo } from 'types'

interface PhotoThumbnailProps {
  photo: Photo
}

const PhotoThumbnail: SFC<PhotoThumbnailProps> = (props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: 'PHOTO_THUMBNAIL',
      photo: props.photo,
    },
  })

  return (
    <div ref={preview} style={{ width: '100px', height: '100px' }}>
      <img
        ref={drag}
        className="photo-gallery__thumbnail"
        src={props.photo.thumbnail_url}
        width="100"
        height="100"
        draggable="true"
        style={{ opacity: isDragging ? 0.4 : 1 }}
        loading="lazy"
      />
    </div>
  )
}

export default PhotoThumbnail
