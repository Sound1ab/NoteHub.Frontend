import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import SimpleMDE from 'react-simplemde-editor'

import {
  useEasyMDE,
  useReadCurrentPath,
  useReadFile,
  useUpdateFile,
} from '../../../hooks'
import { IPosition } from '../../../types'
import { isFile } from '../../../utils'
import { Style } from './MarkdownEditor.styles'
import { CodeRenderer } from '..'

export function MarkdownEditor() {
  const client = useApolloClient()
  const { currentPath } = useReadCurrentPath()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()
  const { setEasyMDE } = useEasyMDE()

  function handleSetMarkdownCursorPosition(cursorPosition: IPosition) {
    client.writeData({
      data: { cursorPosition: { ...cursorPosition, __typename: 'Position' } },
    })
  }

  if (!isFile(currentPath)) {
    return null
  }

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        key={file?.path}
        className="MarkdownEditor-wrapper"
        onChange={value => updateFile(currentPath, value)}
        value={file?.content ?? ''}
        getLineAndCursor={handleSetMarkdownCursorPosition}
        options={{
          toolbar: true,
          status: true,
          theme: 'darcula',
          previewRender(text) {
            return ReactDOMServer.renderToString(
              <ReactMarkdown
                source={text}
                renderers={{
                  code: CodeRenderer,
                  inlineCode: CodeRenderer,
                }}
              />
            )
          },
        }}
        getMdeInstance={setEasyMDE}
      />
    </Style>
  )
}
