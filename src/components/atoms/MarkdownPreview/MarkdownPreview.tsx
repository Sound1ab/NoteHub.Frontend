import 'highlight.js/styles/darkula.css'

import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import React, { useMemo } from 'react'

import { useFile } from '../../../hooks'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
  grid-area: editor;
  padding: ${({ theme }) => theme.spacing.xs};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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
      } catch (error) {
        console.warn('markdown error', error)
      }
    }

    return (
      '<pre class="hljs"><code>' +
      markdown.utils.escapeHtml(str) +
      '</code></pre>'
    )
  },
})

export function MarkdownPreview() {
  const { value } = useFile()

  const html = useMemo<string>(() => markdown.render(value), [value])

  return (
    <Style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Style>
  )
}
