import { DragObjectWithType } from 'react-dnd'

export interface BoardSize {
  width: string
  height: string
}

export interface SocketEvent {
  type: string
  payload: any
}

export interface Offset {
  x: number
  y: number
}

export interface Photo {
  id: number
  author: string
  width: number
  height: number
  url: string
  download_url: string
  thumbnail_url: string
}

export interface DNDItem extends DragObjectWithType {
  type: string | symbol
  photo: Photo
}
