import React from 'react'

import { useCommand } from '../../../hooks'
import { styled } from '../../../theme'
import { MarkdownPreview } from '../../atoms'
import { MarkdownEditor } from '../../molecules'
import { CardList, Sidebar, Toolbar } from '../../organisms'

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
    isEdit,
    handleSetEdit,
    handleImageUpload,
    handleDeleteFile,
    Dropzone,
    setMarkdownCursorPosition,
  } = useCommand()

  return (
    <Style>
      <Dropzone />
      <div className="Dashboard-page">
        <Sidebar />
        <CardList />
        <Toolbar
          isEdit={isEdit}
          handleDeleteFile={handleDeleteFile}
          handleImageUpload={handleImageUpload}
          handleSetEdit={handleSetEdit}
        />
        {isEdit ? (
          <MarkdownEditor setPosition={setMarkdownCursorPosition} />
        ) : (
          <MarkdownPreview />
        )}
      </div>
    </Style>
  )
}
