import React, { useRef } from 'react'

import {
  useDropzone,
  useEasyMDE,
  useModalToggle,
  useReadCurrentPath,
  useReadCurrentRepoName,
  useReadCursorPosition,
  useReadFile,
  useUpdateFile,
} from '../../../hooks'
import { styled } from '../../../theme'
import { isFile } from '../../../utils'
import { Fade } from '../../animation'
import { Button, Dropdown, Icon } from '../../atoms'
import { ColorPicker, Profile } from '../../molecules'

export function Toolbar() {
  const containerRef = useRef(null)
  const { currentRepoName } = useReadCurrentRepoName()
  const { selectFileAndUpload, Dropzone } = useDropzone()
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
    toggleSideBySide,
    toggleBlockquote,
    drawHorizontalRule,
    drawLink,
    drawTable,
  } = useEasyMDE()
  const isMarkdownEditorActive = isFile(currentPath)
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  function handleButtonClick() {
    setOpen(true)
  }

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

  const actions = [
    {
      onClick: toggleItalic,
      title: 'Add italic',
      isDisabled: !isMarkdownEditorActive,
      icon: 'italic' as const,
      separator: false,
    },
    {
      onClick: toggleBold,
      title: 'Add bold',
      isDisabled: !isMarkdownEditorActive,
      icon: 'bold' as const,
      separator: false,
    },
    {
      onClick: toggleBlockquote,
      title: 'Add quote',
      isDisabled: !isMarkdownEditorActive,
      icon: 'quote-right' as const,
      separator: false,
    },
    {
      onClick: toggleOrderedList,
      title: 'Add ordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list-ol' as const,
      separator: false,
    },
    {
      onClick: toggleUnorderedList,
      title: 'Add unordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list' as const,
      separator: false,
    },
    {
      onClick: toggleCodeBlock,
      title: 'Add code block',
      isDisabled: !isMarkdownEditorActive,
      icon: 'code' as const,
      separator: false,
    },
    {
      onClick: drawHorizontalRule,
      title: 'Add horizontal line',
      isDisabled: !isMarkdownEditorActive,
      icon: 'minus' as const,
      separator: false,
    },
    {
      onClick: drawTable,
      title: 'Add table',
      isDisabled: !isMarkdownEditorActive,
      icon: 'table' as const,
      separator: false,
    },
    {
      onClick: drawLink,
      title: 'Add link',
      isDisabled: !isMarkdownEditorActive,
      icon: 'link' as const,
      separator: true,
    },
    {
      onClick: handleImageUpload,
      title: 'Upload an image',
      isDisabled: !isMarkdownEditorActive,
      icon: 'image' as const,
      separator: false,
    },
    {
      onClick: toggleSideBySide,
      title: 'Toggle side by side',
      isDisabled: !isMarkdownEditorActive,
      icon: 'columns' as const,
      separator: true,
    },
  ]

  return (
    <>
      <Dropzone />
      <StyledToolbar>
        <Actions>
          {actions.map((action) => (
            <>
              {action.separator && (
                <Separator key={`${action.title}-separator`}>|</Separator>
              )}
              <ToolbarButton
                key={`${action.title}-button`}
                onClick={action.onClick}
                title={action.title}
                isDisabled={action.isDisabled}
              >
                <Icon size="sm" icon={action.icon} prefix="fa" />
              </ToolbarButton>
            </>
          ))}
          <ColorPicker />
          <DropdownButton ref={containerRef} onClick={handleButtonClick}>
            <Icon size="sm" icon="bars" prefix="fa" />
          </DropdownButton>
          <Fade show={isOpen}>
            <Portal
              domNode={containerRef.current}
              placementAroundContainer="bottom-right"
            >
              <Dropdown
                ref={ref}
                items={actions.map((action) => ({
                  label: action.title,
                  prefix: 'fa',
                  icon: action.icon,
                  onClick: action.onClick,
                  isDisabled: action.isDisabled,
                }))}
                trianglePosition="left"
                onClose={() => setOpen(false)}
              />
            </Portal>
          </Fade>
          <ProfileWrapper>
            <Profile />
          </ProfileWrapper>
        </Actions>
      </StyledToolbar>
    </>
  )
}

const StyledToolbar = styled.div`
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
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  grid-area: editoractions;
  width: 100%;
`

const ToolbarButton = styled(Button)`
  display: none;
  margin-right: ${({ theme }) => theme.spacing.xxs};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }
`

const ProfileWrapper = styled.div`
  margin-left: auto;
`

const DropdownButton = styled(Button)`
  position: relative;
  display: inline-flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const Separator = styled.span`
  display: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing.xxs};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-block;
  }
`
