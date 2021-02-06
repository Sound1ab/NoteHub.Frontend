import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function CodeBlock({ attributes, children }: RenderElementProps) {
  return (
    <Pre {...attributes}>
      <Code>{children}</Code>
    </Pre>
  )
}

const Pre = styled.pre`
  padding: ${({ theme }) => theme.spacing.m};
  background-color: var(--background-secondary);
  border-radius: ${({ theme }) => theme.borderRadius};
`

const Code = styled.code`
  font-family: Consolas, Menlo, Monaco, Courier, monospace;
`
