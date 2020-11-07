import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface ICodeRenderer {
  language: string
  value: string
  inline: boolean
}

export function CodeRenderer({ inline, language, value }: ICodeRenderer) {
  return (
    <SyntaxHighlighter
      language={language}
      style={darcula}
      PreTag={inline ? 'span' : 'pre'}
      customStyle={inline ? { padding: '2px' } : {}}
    >
      {value}
    </SyntaxHighlighter>
  )
}
