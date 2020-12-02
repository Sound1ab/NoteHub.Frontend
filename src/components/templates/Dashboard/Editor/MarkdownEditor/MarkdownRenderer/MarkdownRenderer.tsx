import React from 'react'
import ReactMarkdown from 'react-markdown'

import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'

export const MarkdownRenderer = (text: string) => (
  <ReactMarkdown
    source={text}
    renderers={{
      code: (props) => CodeRenderer({ ...props, inline: false }),
      inlineCode: (props) => CodeRenderer({ ...props, inline: true }),
    }}
  />
)
