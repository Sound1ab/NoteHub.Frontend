import React, { Ref } from 'react'
import styled from 'styled-components'

import {
  useCodeMirror,
  useReadCurrentPath,
  useReadFile,
  useReadThemeSettings,
} from '../../../../../hooks'
import { isFile } from '../../../../../utils'
import { Fade } from '../../../../animation'
import { Icon } from '../../../../atoms'
import { CodeMirror } from './CodeMirror/CodeMirror'
import { Widget } from './Widget/Widget'

interface IMarkdownEditor {
  targetRef: Ref<HTMLDivElement>
}

export function MarkdownEditor({ targetRef }: IMarkdownEditor) {
  const currentPath = useReadCurrentPath()
  const {
    setActions,
    loading,
    activeWidget,
    isWidgetOpen,
    onEditorClick,
    onUpdateFile,
    onMarkdownCursorPosition,
    onRemoveWidget,
  } = useCodeMirror()
  const { isFullWidth, font } = useReadThemeSettings()
  const { file } = useReadFile()

  if (!isFile(currentPath)) {
    return null
  }

  return (
    <StyledMarkdownEditor aria-label="Markdown editor" ref={targetRef}>
      <Fade show={Boolean(loading)}>
        <Spinner size="1x" icon="spinner" />
      </Fade>
      <Fade show={Boolean(isWidgetOpen)}>
        <Widget
          position={activeWidget?.coords}
          message={activeWidget?.message}
        />
      </Fade>
      <CodeMirror
        value={file?.content ?? ''}
        onChange={onUpdateFile}
        onLineAndCursor={onMarkdownCursorPosition}
        onScroll={onRemoveWidget}
        onViewportChange={onRemoveWidget}
        onSetActions={(actions) => setActions?.(actions)}
        onEditorClick={onEditorClick}
        isFullWidth={isFullWidth}
        font={font}
      />
    </StyledMarkdownEditor>
  )
}

const StyledMarkdownEditor = styled.div`
  flex: 1 1 100%;
  padding: 0 ${({ theme }) => theme.spacing.xs};
  overflow-y: scroll;
`

const Spinner = styled(Icon)`
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.text.primary};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  margin: ${({ theme }) => theme.spacing.xs};
  animation-fill-mode: forwards;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
