import { useApolloClient } from '@apollo/react-hooks'

import { CONTAINER_ID } from '../../enums'
import { scrollIntoView } from '../../utils'
import {
  useCreateFile,
  useDeleteFile,
  useDropzone,
  useFile,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadGithubUser,
  useReadIsEdit,
  useReadIsNewFileOpen,
  useReadIsNewRepoOpen,
  useUpdateRepo,
} from '..'

export interface IPosition {
  ch: number
  line: number
  sticky?: string
  __typename?: 'Position'
}

export const REPO_NAMESPACE = 'NoteHub'

function extractFilename(path: string) {
  const [filename] = path.split('/').reverse()
  return filename
}

export function useCommand() {
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const { isEdit } = useReadIsEdit()
  const { isNewFileOpen } = useReadIsNewFileOpen()
  const { isNewRepoOpen } = useReadIsNewRepoOpen()
  const { cursorPosition } = useReadCursorPosition()
  const user = useReadGithubUser()
  const [createNewFile] = useCreateFile()
  const {
    selectFileAndUpload,
    Dropzone,
    loading: isImageUploading,
  } = useDropzone()
  const { setValue, value, path, loading: loadingFile } = useFile()
  // const [updateRepo] = useUpdateRepo()

  function insertFilenameIntoString(filename: string) {
    const text = `![](https://github.com/${user?.login}/${REPO_NAMESPACE}.${currentRepoName}/blob/master/images/${filename}?raw=true)`
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

  async function handleDeleteFile(path?: string | null) {
    if (!path) {
      alert('Delete file: no path provided')
      return
    }

    const filename = extractFilename(path)

    try {
      client.writeData({
        data: { currentFileName: null },
      })
      await deleteFile({
        variables: {
          input: {
            path,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteFile: {
            __typename: 'File',
            filename,
            path,
            content: '',
            excerpt: null,
            sha: 'optimistic',
            _links: {
              __typename: 'Links',
              html: '',
            },
            repo: '',
          },
        },
      })
    } catch {
      alert('There was an issue deleting your file, please try again')
    }
  }

  async function handleCreateFile(path?: string | null) {
    if (!path) {
      alert('Delete file: no path provided')
      return
    }

    const filename = extractFilename(path)
      .toLowerCase()
      .replace(/ /gi, '-')
      .replace(/\//gi, '')

    try {
      await createNewFile({
        variables: {
          input: {
            content: `# ${name}`,
            path,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createFile: {
            __typename: 'File',
            filename: `${filename}.md`,
            path: '',
            content: `# ${name}`,
            excerpt: null,
            sha: 'optimistic',
            _links: {
              __typename: 'Links',
              html: '',
            },
            repo: '',
          },
        },
      })
    } catch {
      alert('There was an issue creating your file, please try again')
    }
  }

  // async function handleUpdateRepo({
  //   isPrivate,
  //   description,
  // }: {
  //   isPrivate?: boolean
  //   description?: string
  // }) {
  //   try {
  //     await updateRepo({
  //       variables: {
  //         input: {
  //           private: isPrivate,
  //           description,
  //         },
  //       },
  //       optimisticResponse: {
  //         __typename: 'Mutation',
  //         updateRepo: {
  //           __typename: 'Repo',
  //           full_name: `${user?.login}/${REPO_NAMESPACE}.${heading}`,
  //           id,
  //           name: heading,
  //           node_id: nodeId,
  //           description: null,
  //           private: !isPrivate,
  //         },
  //       },
  //     })
  //   } catch {
  //     alert('There was an issue update your repo, please try again')
  //   }
  // }

  function handleSetIsNewFileOpen() {
    client.writeData({ data: { isNewFileOpen: !isNewFileOpen } })
    scrollIntoView(CONTAINER_ID.CARDLIST)
  }

  function handleSetIsNewRepoOpen(value = !isNewRepoOpen) {
    client.writeData({ data: { isNewRepoOpen: value } })
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
    handleSetIsNewRepoOpen,
    handleCreateFile,
    fileContent: value,
    filePath: path,
    Dropzone,
    loading: isImageUploading,
    loadingFile,
  }
}
