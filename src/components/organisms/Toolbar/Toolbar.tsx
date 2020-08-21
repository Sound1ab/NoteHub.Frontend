import React from 'react'

import {
  useDropzone,
  useEasyMDE,
  useReadCurrentPath,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadFile,
  useUpdateFile,
} from '../../../hooks'
import { styled } from '../../../theme'
import { isFile } from '../../../utils'
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
  const { currentRepoName } = useReadCurrentRepoName()
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
  const isMarkdownEditorActive = isFile(currentPath)

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

      await updateFile(currentPath, content)
    } catch (error) {
      alert('There was an issue uploading your image. Please try again.')
    }
  }

  return (
    <>
      <Dropzone />
      <Style>
        <div className="Toolbar-actions Toolbar-editor-actions">
          <Button
            className="Toolbar-button"
            onClick={toggleItalic}
            title="Add italic"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="italic" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleBold}
            title="Add bold"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="bold" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleBlockquote}
            title="Add quote"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="quote-right" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleOrderedList}
            title="Add ordered list"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="list-ol" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleUnorderedList}
            title="Add unordered list"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="list" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleCodeBlock}
            title="Add code block"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="code" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={drawHorizontalRule}
            title="Add horizontal line"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="minus" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={toggleSideBySide}
            title="Toggle side by side"
            isDisabled={!isMarkdownEditorActive}
          >
            <Icon size="sm" icon="columns" prefix="fa" />
          </Button>
          <Button
            className="Toolbar-button"
            onClick={handleImageUpload}
            title="Upload an image"
            isLoading={loading}
            isDisabled={!isMarkdownEditorActive}
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
