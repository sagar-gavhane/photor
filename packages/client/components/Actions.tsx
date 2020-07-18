import React, { SFC } from 'react'
import io from 'socket.io-client'

import { BoardSize, SocketEvent } from 'types'

const socket: SocketIOClient.Socket = io.connect(
  process.env.NEXT_PUBLIC_SERVER_URL
)
console.log('(NEXT_PUBLIC_SERVER_URL)', process.env.NEXT_PUBLIC_SERVER_URL)

interface ActionsProps {
  boardSize: BoardSize
}

const Actions: SFC<ActionsProps> = (props) => {
  const handleRotateBoard = () => {
    const shouldRotateBoard: boolean = window.confirm(
      'Changes that you made will be lost. Do you want to continute?'
    )

    if (shouldRotateBoard) {
      if (props.boardSize.width === '640px') {
        const nextBoardSize = { width: '360px', height: '640px' }

        // emit event
        const socketEvent: SocketEvent = {
          type: 'BOARD_ROTATE',
          payload: { boardSize: nextBoardSize },
        }
        socket.emit('BOARD_EVENTS', socketEvent)
      } else {
        const nextBoardSize = { width: '640px', height: '360px' }

        // emit event
        const socketEvent: SocketEvent = {
          type: 'BOARD_ROTATE',
          payload: { boardSize: nextBoardSize },
        }
        socket.emit('BOARD_EVENTS', socketEvent)
      }
    }
  }

  return (
    <div className="actions">
      <div className="button-stack">
        <button className="button" onClick={handleRotateBoard}>
          Rotate to 16/9
        </button>
      </div>
    </div>
  )
}

export default Actions
