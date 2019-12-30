import React from 'react'

import { CommandProvider } from '../../../Context'
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
    handleSetFileContent,
    Dropzone,
    setMarkdownCursorPosition,
    loading,
    fileContent,
    filePath,
  } = useCommand()

  return (
    <CommandProvider
      value={{
        handleDeleteFile,
        handleImageUpload,
        handleSetEdit,
        handleSetIsNewFileOpen,
        loading,
        setMarkdownCursorPosition,
        handleSetFileContent,
        fileContent,
        filePath,
      }}
    >
      <Style>
        <Dropzone />
        <div className="Dashboard-page">
          <Sidebar />
          <CardList />
          <Toolbar />
          <Editor />
        </div>
      </Style>
    </CommandProvider>
  )
}
