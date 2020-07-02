import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'

import {
  useDropzone,
  useEasyMDE,
  useReadCurrentPath,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadFile,
  useReadIsEdit,
  useUpdateFile,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'
import { ColorPicker, Profile } from '../../molecules'

const Style = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.primary};
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
  const { isEdit } = useReadIsEdit()
  const { selectFileAndUpload, Dropzone, loading } = useDropzone()
  const { cursorPosition } = useReadCursorPosition()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()
  const { currentPath } = useReadCurrentPath()
  const {
    toggleOrderedList,
    toggleCodeBlock,
    toggleUnorderedList,
    toggleItalic,
    toggleBold,
    drawHorizontalRule,
    toggleSideBySide,
    toggleBlockquote,
  } = useEasyMDE()

  function insertPathIntoString(filename: string) {
    const text = `![](https://github.com/Sound1ab/${currentRepoName}/blob/master/${filename}?raw=true)`
    const { ch, line } = cursorPosition
    const lines = file?.content ? file.content.split('\n') : []
    const characters = [...lines[line]]
    characters.splice(ch, 0, text)
    lines[line] = characters.join('')
    return lines.join('\n')
  }

  async function handleImageUpload() {
    try {
      const path = await selectFileAndUpload()
      const content = insertPathIntoString(path)

      updateFile(currentPath, content)
    } catch (error) {
      alert(error)
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
            onClick={toggleItalic}
            title="Add italic"
          >
            <Icon size="sm" icon="italic" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleBold}
            title="Add bold"
          >
            <Icon size="sm" icon="bold" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleBlockquote}
            title="Add quote"
          >
            <Icon size="sm" icon="quote-right" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleOrderedList}
            title="Add ordered list"
          >
            <Icon size="sm" icon="list-ol" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleUnorderedList}
            title="Add unordered list"
          >
            <Icon size="sm" icon="list" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleCodeBlock}
            title="Add code block"
          >
            <Icon size="sm" icon="code" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={drawHorizontalRule}
            title="Add horizontal line"
          >
            <Icon size="sm" icon="minus" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleSideBySide}
            title="Toggle side by side"
          >
            <Icon size="sm" icon="columns" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={handleImageUpload}
            title="Upload an image"
            isLoading={loading}
          >
            <Icon size="sm" icon="image" prefix="fa" />
          </Button>
          <ColorPicker />
          <div className="Toolbar-profile">
            <Profile />
          </div>
        </div>
      </Style>
    </>
  )
}
