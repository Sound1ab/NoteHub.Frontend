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
      useInlineStyles={inline}
      customStyle={inline ? { padding: '2px' } : {}}
    >
      {value}
    </SyntaxHighlighter>
  )
}
//
// interface IPre {
//   inline: boolean
//   value: string
// }
//
// function Pre({ inline, realClassName, children }) {
//   const Component = inline ? 'span' : 'pre'
//   return <Component className={realClassName}>{children}</Component>
// }
