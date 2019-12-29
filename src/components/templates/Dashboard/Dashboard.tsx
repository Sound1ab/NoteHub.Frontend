import React from 'react'

import { useCommand } from '../../../hooks'
import { styled } from '../../../theme'
import { CardList, Editor, Sidebar, Toolbar } from '../../organisms'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Dashboard-page {
    display: grid;
    grid-template-columns:
      min-content
      min-content
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'toolbar toolbar toolbar'
      'sidebar filelist editor';
    height: 100%;
    width: 100%;
  }
`

export function Dashboard() {
  const {
    handleSetEdit,
    handleImageUpload,
    handleDeleteFile,
    handleSetIsNewFileOpen,
    Dropzone,
    setMarkdownCursorPosition,
  } = useCommand()

  return (
    <Style>
      <Dropzone />
      <div className="Dashboard-page">
        <Sidebar />
        <CardList handleSetIsNewFileOpen={handleSetIsNewFileOpen} />
        <Toolbar
          handleDeleteFile={handleDeleteFile}
          handleImageUpload={handleImageUpload}
          handleSetEdit={handleSetEdit}
          handleSetIsNewFileOpen={handleSetIsNewFileOpen}
        />
        <Editor setMarkdownCursorPosition={setMarkdownCursorPosition} />
      </div>
    </Style>
  )
}
