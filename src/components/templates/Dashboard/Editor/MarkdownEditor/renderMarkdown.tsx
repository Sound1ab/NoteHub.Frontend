import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'

import { CodeRenderer } from '../CodeRenderer/CodeRenderer'

export const renderMarkdown = (text: string) =>
  ReactDOMServer.renderToString(
    <ReactMarkdown
      source={text}
      renderers={{
        code: (props) => CodeRenderer({ ...props, inline: false }),
        inlineCode: (props) => CodeRenderer({ ...props, inline: true }),
      }}
    />
  )
