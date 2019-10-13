import MarkdownIt from 'markdown-it'
import React, { useContext, useMemo } from 'react'
import { styled } from '../../../theme'
import { EditorContext } from '../../molecules'
import hljs from 'highlight.js'
import 'highlight.js/styles/darkula.css'

const Style = styled.div`
  position: relative;
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

export function MarkdownPreview() {
  const editorContext = useContext(EditorContext)

  const value = (editorContext && editorContext.value) || ''

  const html = useMemo<string>(() => markdown.render(value), [value])

  return (
    <Style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Style>
  )
}
