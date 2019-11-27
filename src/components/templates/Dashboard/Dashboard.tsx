import React from 'react'
import { styled } from '../../../theme'
import { CardList, Sidebar, Toolbar } from '../../organisms'
import { useCommands } from '../../../hooks'
import { MarkdownPreview, Monaco } from '../../atoms'

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
    setValue,
    isEdit,
    loading,
    Dropzone,
    editorRef,
    uploadImage,
    value,
  } = useCommands()

  return (
    <Style>
      <Dropzone />
      <div className="Dashboard-page">
        <Sidebar />
        <CardList />
        <Toolbar uploadImage={uploadImage} />
        {isEdit ? (
          <Monaco
            onChange={setValue}
            value={value}
            loading={loading}
            ref={editorRef}
          />
        ) : (
          <MarkdownPreview value={value} />
        )}
      </div>
    </Style>
  )
}
