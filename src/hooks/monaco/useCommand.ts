import { useApolloClient } from '@apollo/react-hooks'

import {
  useDeleteFile,
  useDropzone,
  useFile,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadGithubUser,
  useReadIsEdit,
  useReadIsNewFileOpen,
} from '..'

export interface IPosition {
  ch: number
  line: number
  sticky?: string
  __typename?: 'Position'
}

export function useCommand() {
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const { isEdit } = useReadIsEdit()
  const { isNewFileOpen } = useReadIsNewFileOpen()
  const { cursorPosition } = useReadCursorPosition()
  const user = useReadGithubUser()
  const {
    selectFileAndUpload,
    Dropzone,
    loading: isImageUploading,
  } = useDropzone()
  const { setValue, value, path } = useFile()

  function insertFilenameIntoString(filename: string) {
    const text = `![](https://github.com/${user?.login}/noted-app-notes--${currentRepoName}/blob/master/images/${filename}?raw=true)`
    const { ch, line } = cursorPosition
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

  function handleSetIsNewFileOpen() {
    client.writeData({ data: { isNewFileOpen: !isNewFileOpen } })
  }

  function handleSetFileContent(newValue: string) {
    setValue(newValue)
  }

  function handleSetMarkdownCursorPosition(cursorPosition: IPosition) {
    client.writeData({
      data: { cursorPosition: { ...cursorPosition, __typename: 'Position' } },
    })
  }

  return {
    handleDeleteFile,
    handleImageUpload,
    handleSetEdit,
    handleSetIsNewFileOpen,
    handleSetFileContent,
    handleSetMarkdownCursorPosition,
    fileContent: value,
    filePath: path,
    Dropzone,
    loading: isImageUploading,
  }
}
