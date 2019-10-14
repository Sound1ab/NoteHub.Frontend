import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { COLOR_MODE } from '../../../enums'
import { useStore } from '../../../hooks'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { styled } from '../../../theme'
import { css } from 'styled-components'
import { DropzoneContext, MarkdownPreview, Monaco, Spinner } from '../../atoms'
import { ColorModeContext } from '../../utility'

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
  overflow-y: scroll;
  overflow-x: hidden;
`

export const EditorContext = React.createContext<{
  colorMode: COLOR_MODE
  value: string
  setValue: (value: string) => void
  saveFile: () => void
  uploadImage: () => void
} | null>(null)

interface IEditor {
  children: ReactNode
}

export function Editor({ children }: IEditor) {
  const { colorMode } = useContext(ColorModeContext)
  const [selectFileAndUpload, dropzoneLoading] = useContext(DropzoneContext)
  const [value, setValue] = useState('')
  const [state] = useStore()
  const { file, loading } = useReadFile(
    state.user.username,
    state.repo.activeRepo.name,
    state.repo.activeFile.filename
  )
  const updateFile = useUpdateFile(
    state.user.username,
    state.repo.activeRepo.name,
    state.repo.activeFile.filename
  )

  useEffect(() => {
    setValue((file && file.content) || '')
  }, [file])

  async function saveFile() {
    if (!state.repo.activeFile.filename) {
      return
    }
    await updateFile({
      variables: {
        input: {
          content: value,
          filename: state.repo.activeFile.filename,
          repo: state.repo.activeRepo.name,
          username: state.user.username,
        },
      },
    })
  }

  async function uploadImage() {
    const filename = await selectFileAndUpload()
    setValue(currentValue => `${currentValue}![](images/${filename})`)
  }

  return (
    <EditorContext.Provider
      value={{ colorMode, value, saveFile, setValue, uploadImage }}
    >
      {children}
      <Style isEdit={state.toolbar.isEdit}>
        {(dropzoneLoading || loading) && <Spinner />}

        {state.toolbar.isEdit ? <Monaco /> : <MarkdownPreview />}
      </Style>
    </EditorContext.Provider>
  )
}
