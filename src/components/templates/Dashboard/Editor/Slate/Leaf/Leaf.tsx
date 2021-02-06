import React from 'react'
import { RenderLeafProps } from 'slate-react/dist/components/editable'
import styled, { css } from 'styled-components'

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.inlineCode) {
    children = <Code>{children}</Code>
  }

  return (
    <Node {...attributes} leaf={leaf}>
      {children}
    </Node>
  )
}

const Code = styled.code`
  padding: ${({ theme }) => theme.spacing.xxs};
  background-color: var(--background-secondary);
  font-family: Consolas, Menlo, Monaco, Courier, monospace;
`

const Node = styled.span<{ leaf: RenderLeafProps['leaf'] }>`
  color: inherit;
  ${({ leaf }) =>
    leaf['function-variable'] &&
    css`
      color: var(--text-primary);
    `}
  ${({ leaf }) =>
    leaf.parameter &&
    css`
      color: #ab661d;
    `}
  ${({ leaf }) =>
    leaf.operator &&
    css`
      color: #a751a1;
    `}
  ${({ leaf }) =>
    leaf.comment &&
    css`
      color: slategray;
    `}
    ${({ leaf }) =>
    (leaf.operator || leaf.url) &&
    css`
      color: #a751a1;
    `}
    ${({ leaf }) =>
    leaf.keyword &&
    css`
      color: #a751a1;
    `}
    ${({ leaf }) =>
    (leaf.number ||
      leaf.boolean ||
      leaf.tag ||
      leaf.constant ||
      leaf.symbol ||
      leaf.attr ||
      leaf.selector) &&
    css`
      color: #7551a7;
    `}
    ${({ leaf }) =>
    leaf.punctuation &&
    css`
      color: var(--text-primary);
    `}${({ leaf }) =>
    leaf.string &&
    css`
      color: #a28e4d;
    `} ${({ leaf }) =>
    (leaf.function || leaf.class) &&
    css`
      color: #a751a1;
    `};
`
