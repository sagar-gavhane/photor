import React, { useState, SFC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Layout from 'components/Layout'
import PhotoGallery from 'components/PhotoGallery'
import Board from 'components/Board'
import Actions from 'components/Actions'
import Header from 'components/Header'

const IndexPage: SFC = () => {
  const [boardSize, setBoardSize] = useState({
    width: '640px',
    height: '360px',
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Header />
        <PhotoGallery />
        <Board boardSize={boardSize} setBoardSize={setBoardSize} />
        <Actions boardSize={boardSize} />
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
