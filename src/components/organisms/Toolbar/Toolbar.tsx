import React, {
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react'
import { styled } from '../../../theme'
import { Button, Icon, Ref } from '../../atoms'
import { CreateFileModal, DeleteFileModal, Profile } from '../../molecules'
import { ColorModeContext } from '../../utility'
import {
  useDropzone,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '../../../hooks'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  display: grid;
  grid-template-columns: subgrid;
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
  ref: MutableRefObject<Ref | null>
  isImageUploading: boolean
}

interface IToolbar {
  children: (props: IRenderProps) => ReactNode
}

export function Toolbar({ children }: IToolbar) {
  const ref = useRef<Ref | null>(null)
  const [isEdit, setIsEdit] = useState(true)
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)
  const [isDeleteFileModalOpen, setIsDeleteFileModalOpen] = useState(false)
  const { currentRepoName } = useReadCurrentRepoName()
  const { toggleColorMode, isDarkMode } = useContext(ColorModeContext)
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
      ref?.current?.insertTextAtCursorPosition(text)
    } catch (error) {
      console.log(`Could not upload image: ${error}`)
    }
  }

  function handleSetPreview() {
    setIsEdit(isEdit => !isEdit)
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
          >
            <Icon size="sm" icon="edit" prefix="fa" />
          </Button>
          <Button
            isDisabled={!currentRepoName}
            onClick={setIsDeleteFileModalOpen.bind(null, true)}
          >
            <Icon size="sm" icon="trash" prefix="fa" />
          </Button>
        </div>
        <div className="Toolbar-actions Toolbar-editor-actions">
          <Button
            isActive={isEdit}
            className="Toolbar-button"
            onClick={handleSetPreview}
          >
            <Icon size="sm" icon="pen" prefix="fa" />
          </Button>
          <Button className="Toolbar-button" onClick={uploadImage}>
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
        <DeleteFileModal
          isOpen={isDeleteFileModalOpen}
          onRequestClose={setIsDeleteFileModalOpen.bind(null, false)}
        />
      </Style>
      {children({ isEdit, ref, isImageUploading })}
    </>
  )
}
