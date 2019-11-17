import React, { ReactNode, useContext, useRef } from 'react'
import { COLOR_MODE } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { css } from 'styled-components'
import {
  DropzoneContext,
  MarkdownPreview,
  Monaco,
  Ref,
  Spinner,
} from '../../atoms'
import { ColorModeContext } from '../../utility'
import { useFile } from '../../../hooks/monaco/useFile'
import { useReadCurrentRepoName } from '../../../hooks/Repo/useReadCurrentRepoName'
import { useReadCurrentFileName } from '../../../hooks/file/useReadCurrentFileName'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'

const Style = styled.div<{ isEdit: boolean }>`
  position: relative;
  grid-area: editor;
  ${({ theme, isEdit }) =>
    isEdit
      ? css`
          padding: ${theme.spacing.xs} 0;
        `
      : css`
          padding: ${theme.spacing.xs};
        `};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export const EditorContext = React.createContext<{
  colorMode: COLOR_MODE
  value: string
  onChange: (newValue: string) => void
  uploadImage: () => void
} | null>(null)

interface IEditor {
  children: ReactNode
}

export function Editor({ children }: IEditor) {
  const editorRef = useRef<Ref | null>(null)
  const { colorMode } = useContext(ColorModeContext)
  const [selectFileAndUpload, dropzoneLoading] = useContext(DropzoneContext)
  const [
    {
      toolbar: { isEdit },
    },
  ] = useStore()
  const { setValue, loading, value } = useFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const user = useReadGithubUser()

  async function uploadImage() {
    const line = editorRef?.current?.getPosition()

    if (!line) {
      return
    }

    const monaco = editorRef?.current?.monaco

    if (!monaco) {
      return
    }

    await selectFileAndUpload()
    const range = new monaco.Range(
      line.lineNumber,
      line.column,
      line.lineNumber,
      line.column
    )

    const id = { major: 1, minor: 1 }
    const text = `![](https://github.com/${user?.name}/noted-app-notes--${currentRepoName}/blob/master/images/${currentFileName}?raw=true)`
    const op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true,
    }

    editorRef?.current?.executeEdits('my-source', [op])
  }

  return (
    <EditorContext.Provider
      value={{ colorMode, value, onChange: setValue, uploadImage }}
    >
      {children}
      <Style isEdit={isEdit}>
        {(dropzoneLoading || loading) && <Spinner />}

        {isEdit ? <Monaco ref={editorRef} /> : <MarkdownPreview />}
      </Style>
    </EditorContext.Provider>
  )
}
