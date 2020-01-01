import React from 'react'

import {
  useCommand,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadIsEdit,
  useReadIsNewFileOpen,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'
import { Profile } from '../../molecules'

const Style = styled.div<{ isNewFileOpen: boolean }>`
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

  .Toolbar-profile {
    margin-left: auto;
  }

  .Toolbar-button {
    margin-right: ${({ theme }) => theme.spacing.xxs};
    pointer-events: ${({ isNewFileOpen }) => (isNewFileOpen ? 'none' : 'all')};
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
  const {
    handleSetEdit,
    handleImageUpload,
    handleDeleteFile,
    handleSetIsNewFileOpen,
    Dropzone,
  } = useCommand()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const { isEdit } = useReadIsEdit()
  const { isNewFileOpen } = useReadIsNewFileOpen()

  return (
    <>
      <Dropzone />
      <Style isNewFileOpen={isNewFileOpen}>
        <div className="Toolbar-actions Toolbar-file-actions">
          <Button
            isActive={isNewFileOpen}
            isDisabled={!currentRepoName}
            className="Toolbar-button"
            onClick={handleSetIsNewFileOpen}
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
            onClick={handleSetEdit}
            ariaLabel={
              isEdit ? 'View file in preview' : 'View file in markdown'
            }
          >
            <Icon size="sm" icon="pen" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={handleImageUpload}
            ariaLabel="Upload an image"
          >
            <Icon size="sm" icon="image" prefix="fa" />
          </Button>
          <div className="Toolbar-profile">
            <Profile />
          </div>
        </div>
      </Style>
    </>
  )
}
