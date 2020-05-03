import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'

import {
  useDropzone,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadFile,
  useReadIsEdit,
  useUpdateFile,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'
import { Profile } from '../../molecules'

const Style = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;

    grid-area: toolbar;
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
    grid-template-areas: 'repoactions editoractions';
  }

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

  .Toolbar-editor-actions {
    grid-area: editoractions;
    width: 100%;
  }
`

export function Toolbar() {
  const client = useApolloClient()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const { isEdit } = useReadIsEdit()
  const { selectFileAndUpload, Dropzone } = useDropzone()
  const { cursorPosition } = useReadCursorPosition()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()

  function insertFilenameIntoString(filename: string) {
    const text = `![](https://github.com/Sound1ab/${currentRepoName}/blob/master/images/${filename}?raw=true)`
    const { ch, line } = cursorPosition
    const lines = file?.content ? file.content.split('\n') : []
    const characters = [...lines[line]]
    characters.splice(ch, 0, text)
    lines[line] = characters.join('')
    return lines.join('\n')
  }

  async function handleImageUpload() {
    try {
      const filename = await selectFileAndUpload()
      const newValue = insertFilenameIntoString(filename)
      updateFile(newValue)
    } catch (error) {
      console.log(`Could not upload image: ${error}`)
    }
  }

  function handleSetEdit() {
    client.writeData({ data: { isEdit: !isEdit } })
  }

  return (
    <>
      <Dropzone />
      <Style>
        <div className="Toolbar-actions Toolbar-editor-actions">
          <Button
            isActive={isEdit}
            className="Toolbar-button"
            onClick={handleSetEdit}
            title={isEdit ? 'View file in preview' : 'View file in markdown'}
          >
            <Icon size="sm" icon="pen" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            isDisabled={!currentFileName}
            onClick={handleImageUpload}
            title="Upload an image"
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
