import React, { useContext, useEffect, useState } from 'react'

import { useStore } from '../../../hooks'

import { DropzoneContext, Editor, Spinner } from '..'
import { COLOR_MODE } from '../../../enums'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { styled } from '../../../theme'
import { ColorModeContext } from '../../utility'

const Style = styled.div`
  position: relative;
  grid-area: editor;
  width: 70%;
  margin: 0 auto;
`

export const EditorContext = React.createContext<{
  colorMode: COLOR_MODE
  value: string
  setValue: (value: string) => void
  saveFile: (content: string) => void
  uploadImage: () => void
} | null>(null)

export function Ace() {
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

  async function saveFile(content: string) {
    if (!state.repo.activeFile) {
      return
    }
    await updateFile({
      variables: {
        input: {
          content,
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
    <Style>
      {(dropzoneLoading || loading) && <Spinner />}
      <EditorContext.Provider value={{ colorMode, value, saveFile, setValue, uploadImage }}>
        <Editor />
      </EditorContext.Provider>
    </Style>
  )
}
