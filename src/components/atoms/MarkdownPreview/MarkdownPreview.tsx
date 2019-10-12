import MarkdownIt from 'markdown-it'
import React, { useContext, useMemo } from 'react'
import { styled } from '../../../theme'
import { EditorContext } from '../../molecules'

const Style = styled.div`
  position: relative;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.accent};
  }

  code,
  kbd,
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  code,
  pre {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
    font-size: 12px;
  }

  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
  }

  pre {
    word-wrap: normal;
  }

  pre > code {
    background: transparent;
    border: 0;
    font-size: 100%;
    margin: 0;
    padding: 0;
    white-space: pre;
    word-break: normal;
  }

  pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    max-width: auto;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
  }
`

const md = new MarkdownIt()

export function MarkdownPreview() {
  const editorContext = useContext(EditorContext)

  const value = editorContext && editorContext.value || ''

  const html = useMemo<string>(() => md.render(value), [
    value,
  ])

  return (
    <Style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Style>
  )
}
