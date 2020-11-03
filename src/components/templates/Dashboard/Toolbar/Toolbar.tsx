import React, {
  Fragment,
  ReactText,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { toast } from 'react-toastify'

import {
  useDropzone,
  useEasyMDE,
  useModalToggle,
  useReadCurrentPath,
  useReadCursorPosition,
  useReadFile,
  useUpdateFile,
} from '../../../../hooks'
import { styled } from '../../../../theme'
import { isFile } from '../../../../utils'
import { Fade } from '../../../animation'
import { Dropdown, Icon } from '../../../atoms'
import { ColorPicker } from './ColorPicker/ColorPicker'
import { Profile } from './Profile/Profile'
import { ToolbarButton } from './ToolbarButton/ToolbarButton'

export function Toolbar() {
  const currentPath = useReadCurrentPath()
  const cursorPosition = useReadCursorPosition()
  const containerRef = useRef(null)
  const {
    openFileDialog,
    Dropzone,
    done,
    imagePath,
    progress,
    loading,
  } = useDropzone()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()
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
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()
  const toastId = React.useRef<ReactText | null>(null)

  function handleButtonClick() {
    setOpen(true)
  }

  const fileContent = file?.content

  const insertPathIntoString = useCallback(
    (path: string | null) => {
      if (!path) {
        return
      }

      const text = `![](${path})`
      const { ch, line } = cursorPosition
      const lines = fileContent ? fileContent.split('\n') : []
      const characters = lines.length > 0 ? [...lines[line]] : []
      characters.splice(ch, 0, text)
      lines[line] = characters.join('')
      return lines.join('\n')
    },
    [cursorPosition, fileContent]
  )

  const updateEditor = useCallback(async () => {
    try {
      const content = insertPathIntoString(imagePath)

      await updateFile(currentPath, content)
    } catch (error) {
      alert('There was an issue uploading your image. Please try again.')
    }
  }, [currentPath, imagePath, updateFile, insertPathIntoString])

  useEffect(() => {
    if (!done || !imagePath) {
      return
    }
    updateEditor()
  }, [done, updateEditor, imagePath])

  useEffect(() => {
    if (!done) {
      return
    }

    if (toastId.current) {
      if (progress !== 100) {
        // If the upload has finished but doesn't reach 100, the toast will not
        // close. In this case we need to finish off the progress to close it ourselves
        toast.done(toastId.current)
      }
      toastId.current = null
    }

    return
  }, [done, progress])

  useEffect(() => {
    if (!loading) {
      return
    }

    const decimalProgress = progress / 100

    if (toastId.current === null) {
      toastId.current = toast('Upload in Progress', {
        progress: decimalProgress,
      })
    } else {
      toast.update(toastId.current, {
        progress: decimalProgress,
      })
    }
  }, [loading, progress])

  function handleImageUpload() {
    openFileDialog()
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
            <Fragment key={action.title}>
              {action.separator && <Separator>|</Separator>}
              <ToolbarButton
                onClick={action.onClick}
                title={action.title}
                isDisabled={action.isDisabled}
              >
                <Icon size="1x" icon={action.icon} />
              </ToolbarButton>
            </Fragment>
          ))}
          <ColorPicker />
          <MobileMenuButton ref={containerRef} onClick={handleButtonClick}>
            <Icon size="sm" icon="bars" />
          </MobileMenuButton>
          <Fade show={isOpen}>
            <Portal
              domNode={containerRef.current}
              placementAroundContainer="bottom-right"
            >
              <Dropdown
                containerRef={ref}
                items={actions.map((action) => ({
                  label: action.title,
                  icon: action.icon,
                  onClick: action.onClick,
                  isDisabled: action.isDisabled,
                }))}
                trianglePosition="left"
                onClose={() => setOpen(false)}
              />
            </Portal>
          </Fade>
          <StyledProfile />
        </Actions>
      </StyledToolbar>
    </>
  )
}

const StyledToolbar = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.primary};

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

const StyledProfile = styled(Profile)`
  margin-left: auto;
`

const MobileMenuButton = styled(ToolbarButton)`
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
