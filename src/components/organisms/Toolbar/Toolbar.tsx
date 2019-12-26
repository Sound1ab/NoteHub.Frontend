import { useApolloClient } from '@apollo/react-hooks'
import React, { MutableRefObject, ReactNode, useRef, useState } from 'react'

import {
  useColorModeFromLocalStorage,
  useDeleteFile,
  useDropzone,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'
import { CreateFileModal, Profile } from '../../molecules'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  display: grid;
  @supports (grid-template-columns: subgrid) {
    grid-template-columns: subgrid;
  }
  @supports not (grid-template-columns: subgrid) {
    grid-template-columns:
      minmax(0, ${({ theme }) => theme.spacing.xl})
      minmax(0, ${({ theme }) => theme.spacing.xxl})
      3fr;
  }
  grid-template-rows: auto;
  grid-template-areas: 'repoactions fileactions editoractions';
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  .Toolbar-profile {
    margin-left: auto;
  }

  .Toolbar-button {
    margin-right: ${({ theme }) => theme.spacing.xxs};
  }

  .Toolbar-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xs};
  }

  .Toolbar-file-actions {
    grid-area: fileactions;
  }

  .Toolbar-editor-actions {
    grid-area: editoractions;
  }
`

interface IRenderProps {
  isEdit: boolean
  ref: MutableRefObject<null>
  isImageUploading: boolean
}

interface IToolbar {
  children?: (props: IRenderProps) => ReactNode
}

export function Toolbar({ children }: IToolbar) {
  const ref = useRef<null>(null)
  const client = useApolloClient()
  const [isEdit, setIsEdit] = useState(true)
  const [deleteFile] = useDeleteFile()
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const { toggleColorMode, isDarkMode } = useColorModeFromLocalStorage()
  const user = useReadGithubUser()
  const {
    selectFileAndUpload,
    Dropzone,
    loading: isImageUploading,
  } = useDropzone()

  async function uploadImage() {
    try {
      const filename = await selectFileAndUpload()
      const text = `![](https://github.com/${user?.login}/noted-app-notes--${currentRepoName}/blob/master/images/${filename}?raw=true)`
      // ref?.current?.insertTextAtCursorPosition(text)
    } catch (error) {
      console.log(`Could not upload image: ${error}`)
    }
  }

  function handleSetPreview() {
    setIsEdit(isEdit => !isEdit)
  }

  async function handleDeleteFile() {
    console.log('here')
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

  return (
    <>
      <Dropzone />
      <Style>
        <div className="Toolbar-actions Toolbar-file-actions">
          <Button
            isDisabled={!currentRepoName}
            className="Toolbar-button"
            onClick={setIsCreateFileModalOpen.bind(null, true)}
            ariaLabel="Create a new file"
          >
            <Icon size="sm" icon="edit" prefix="fa" />
          </Button>
          <Button
            isDisabled={!currentRepoName || !currentFileName}
            onClick={handleDeleteFile}
            ariaLabel="Delete the selected file"
          >
            <Icon size="sm" icon="trash" prefix="fa" />
          </Button>
        </div>
        <div className="Toolbar-actions Toolbar-editor-actions">
          <Button
            isActive={isEdit}
            className="Toolbar-button"
            onClick={handleSetPreview}
            ariaLabel={
              isEdit ? 'View file in preview' : 'View file in markdown'
            }
          >
            <Icon size="sm" icon="pen" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={uploadImage}
            ariaLabel="Upload an image"
          >
            <Icon size="sm" icon="image" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            isActive={isDarkMode}
            onClick={toggleColorMode}
          >
            <Icon size="sm" icon="moon" prefix="fa" />
          </Button>
          <div className="Toolbar-profile">
            <Profile />
          </div>
        </div>
        <CreateFileModal
          isOpen={isCreateFileModalOpen}
          onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
        />
      </Style>
      {children ? children({ isEdit, ref, isImageUploading }) : null}
    </>
  )
}
