import { useApolloClient } from '@apollo/react-hooks'
import { useState } from 'react'

import {
  useDeleteFile,
  useDropzone,
  useFile,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadGithubUser,
  useReadIsEdit,
} from '..'

export interface IPosition {
  ch: number
  line: number
  sticky?: string
}

export function useCommand() {
  const client = useApolloClient()
  const [markdownCursorPosition, setMarkdownCursorPosition] = useState<
    IPosition
  >({
    line: 0,
    ch: 0,
    sticky: undefined,
  })
  const [deleteFile] = useDeleteFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const { isEdit } = useReadIsEdit()
  const user = useReadGithubUser()
  const {
    selectFileAndUpload,
    Dropzone,
    loading: isImageUploading,
  } = useDropzone()
  const { setValue, value } = useFile()

  function insertFilenameIntoString(filename: string) {
    const text = `![](https://github.com/${user?.login}/noted-app-notes--${currentRepoName}/blob/master/images/${filename}?raw=true)`
    const { ch, line } = markdownCursorPosition
    const lines = value.split('\n')
    const characters = [...lines[line]]
    characters.splice(ch, 0, text)
    lines[line] = characters.join('')
    return lines.join('\n')
  }

  async function handleImageUpload() {
    try {
      const filename = await selectFileAndUpload()
      const newValue = insertFilenameIntoString(filename)
      setValue(newValue)
    } catch (error) {
      console.log(`Could not upload image: ${error}`)
    }
  }

  function handleSetEdit() {
    client.writeData({ data: { isEdit: !isEdit } })
  }

  async function handleDeleteFile() {
    if (!user || !currentRepoName || !currentFileName) {
      alert('Error')
      return
    }

    try {
      await deleteFile({
        variables: {
          input: {
            filename: currentFileName,
            repo: currentRepoName,
            username: user.login,
          },
        },
      })
      client.writeData({
        data: { currentFileName: null },
      })
    } catch {
      alert('There was an issue deleting your file, please try again')
    }
  }

  return {
    handleDeleteFile,
    handleImageUpload,
    handleSetEdit,
    Dropzone,
    loading: isImageUploading,
    setMarkdownCursorPosition,
  }
}
