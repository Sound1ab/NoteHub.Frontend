import React, { useContext, useState } from 'react'
import { useStore } from '../../../hooks'
import { setIsPreview } from '../../../store'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'
import {
  CreateFileModal,
  DeleteFileModal,
  EditorContext,
  Profile,
} from '../../molecules'
import { ColorModeContext } from '../../utility'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  display: grid;
  grid-template-columns:
    minmax(0, ${({ theme }) => theme.spacing.xl})
    minmax(0, ${({ theme }) => theme.spacing.xxl})
    3fr;
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

export function Toolbar() {
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)

  const [isDeleteFileModalOpen, setIsDeleteFileModalOpen] = useState(false)

  const editorContext = useContext(EditorContext)

  const [
    {
      toolbar: { isPreview },
      repo: {
        activeRepo: { id },
      },
    },
    dispatch,
  ] = useStore()
  const { toggleColorMode, isDarkMode } = useContext(ColorModeContext)

  function handleSetPreview() {
    dispatch(setIsPreview(!isPreview))
  }

  function handleUploadImage() {
    console.log(editorContext)
    if (!editorContext) {
      return
    }
    editorContext.uploadImage()
  }

  return (
    <Style>
      <div className="Toolbar-actions Toolbar-file-actions">
        <Button
          isDisabled={!id}
          className="Toolbar-button"
          onClick={setIsCreateFileModalOpen.bind(null, true)}
        >
          <Icon size="sm" icon="edit" prefix="fa" />
        </Button>
        <Button
          isDisabled={!id}
          onClick={setIsDeleteFileModalOpen.bind(null, true)}
        >
          <Icon size="sm" icon="trash" prefix="fa" />
        </Button>
      </div>
      <div className="Toolbar-actions Toolbar-editor-actions">
        <Button
          isActive={isPreview}
          className="Toolbar-button"
          onClick={handleSetPreview}
        >
          <Icon size="sm" icon="pen" prefix="fa" />
        </Button>
        <Button className="Toolbar-button" onClick={handleUploadImage}>
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
  )
}
