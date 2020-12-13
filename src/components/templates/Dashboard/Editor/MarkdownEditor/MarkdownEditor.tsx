import React, { Ref } from 'react'
import styled from 'styled-components'

import { useCodeMirror, useReadCurrentPath } from '../../../../../hooks'
import { composeRefs, isFile } from '../../../../../utils'
import { Icon } from '../../../../atoms'
import { CodeMirror } from './CodeMirror/CodeMirror'
import { Widget } from './Widget/Widget'

interface IMarkdownEditor {
  targetRef: Ref<HTMLDivElement>
}

export function MarkdownEditor({ targetRef }: IMarkdownEditor) {
  const currentPath = useReadCurrentPath()
  const { loading, isWidgetOpen, onRemoveWidget, scrollRef } = useCodeMirror()

  if (!isFile(currentPath)) {
    return null
  }

  return (
    <StyledMarkdownEditor
      aria-label="Markdown editor"
      ref={composeRefs(targetRef, scrollRef)}
      onScroll={() => onRemoveWidget?.()}
    >
      {loading && <Spinner size="1x" icon="spinner" />}
      {isWidgetOpen && <Widget />}
      <CodeMirror />
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
