import React, { useRef } from 'react'
import styled from 'styled-components'

import { useCodeMirror } from '../../../../../hooks/codeMirror/useCodeMirror'
import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useWidget } from '../../../../../hooks/recoil/useWidget'
import { isFile } from '../../../../../utils/isFile'
import { CodeMirror } from './CodeMirror/CodeMirror'
import { Widget } from './Widget/Widget'

export function MarkdownEditor() {
  const [activePath] = useActivePath()
  const [{ removeWidget }] = useCodeMirror()
  const [widget] = useWidget()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  if (!isFile(activePath)) {
    return null
  }

  return (
    <StyledMarkdownEditor
      aria-label="Markdown editor"
      ref={scrollRef}
      onScroll={() => removeWidget?.()}
    >
      {widget && <Widget />}
      <CodeMirror />
    </StyledMarkdownEditor>
  )
}

const StyledMarkdownEditor = styled.div`
  flex: 1 1 100%;
  padding: ${({ theme }) => theme.spacing.xs};
`
