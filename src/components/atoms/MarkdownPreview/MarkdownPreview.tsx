import MarkdownIt from 'markdown-it'
import React, { useMemo } from 'react'
import { styled } from '../../../theme'
import hljs from 'highlight.js'
import 'highlight.js/styles/darkula.css'

const Style = styled.div`
  position: relative;
  grid-area: editor;
  padding: ${({ theme }) => theme.spacing.xs};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  h1,
  h2 {
    border-bottom: solid 1px ${({ theme }) => theme.colors.accent};
    padding-bottom: ${({ theme }) => theme.rhythm(0.5)};
  }
`

const markdown: any = MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' +
      markdown.utils.escapeHtml(str) +
      '</code></pre>'
    )
  },
})

interface IMarkdownPreview {
  value: string
}

export function MarkdownPreview({ value }: IMarkdownPreview) {
  const html = useMemo<string>(() => markdown.render(value), [value])

  return (
    <Style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Style>
  )
}
