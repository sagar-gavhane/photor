import React, { useRef, useEffect, SFC } from 'react'
import io from 'socket.io-client'
import { useDrop } from 'react-dnd'

import { BoardSize, Offset, SocketEvent, DNDItem } from 'types'

const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL)

interface BoardProps {
  boardSize: BoardSize
  setBoardSize: (boardSize: BoardSize) => void
}

const Board: SFC<BoardProps> = (props) => {
  const boardRef = useRef(null)
  const [, drop] = useDrop({
    accept: 'PHOTO_THUMBNAIL',
    drop: (item: DNDItem, monitor) => {
      const coordinates = monitor.getClientOffset()

      if (boardRef.current) {
        const offset: Offset = {
          x:
            props.boardSize.width === '360px'
              ? Math.abs(coordinates.x - 600)
              : Math.abs(coordinates.x - 475),
          y: coordinates.y - 175,
        }
        const canvas = boardRef.current.querySelector('#canvas')
        const image = new Image()
        image.src = item.photo.thumbnail_url
        image.onload = () => {
          canvas.getContext('2d').drawImage(image, offset.x, offset.y, 150, 150)

          // emit event
          const socketEvent: SocketEvent = {
            type: 'DROP_IMAGE',
            payload: {
              image: {
                src: item.photo.thumbnail_url,
                offset,
              },
            },
          }

          socket.emit('BOARD_EVENTS', socketEvent)
        }
      }

      return {
        allowedDropEffect: 'copy',
        photo: item?.photo,
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  useEffect(() => {
    socket.on('BOARD_EVENTS', (event: SocketEvent) => {
      if (boardRef && event.type === 'DROP_IMAGE') {
        const canvas = boardRef.current.querySelector('#canvas')
        const image = new Image()
        image.src = event.payload.image.src
        image.onload = () => {
          const offset = event.payload.image.offset
          canvas.getContext('2d').drawImage(image, offset.x, offset.y, 150, 150)
        }
      }

      if (event.type === 'BOARD_ROTATE') {
        props.setBoardSize({
          width: event.payload.boardSize.width,
          height: event.payload.boardSize.height,
        })
      }
    })
  }, [])

  return (
    <div ref={boardRef} className="board">
      <canvas
        ref={drop}
        id="canvas"
        className="board__canvas"
        width={props.boardSize.width}
        height={props.boardSize.height}
      />
    </div>
  )
}

export default Board
