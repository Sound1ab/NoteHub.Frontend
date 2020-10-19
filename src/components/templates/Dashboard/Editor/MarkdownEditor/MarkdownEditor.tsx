import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import SimpleMDE from 'react-simplemde-editor'

import {
  useEasyMDE,
  useReadCurrentPath,
  useReadFile,
  useUpdateFile,
} from '../../../../../hooks'
import { IPosition } from '../../../../../types'
import { isFile } from '../../../../../utils'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { CodeRenderer } from '../CodeRenderer/CodeRenderer'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const currentPath = useReadCurrentPath()
  const { file, error: readError } = useReadFile()
  const [updateFile, { error: updateError }] = useUpdateFile()
  const { setEasyMDE } = useEasyMDE()

  if (readError) {
    alert('Could not read file. Please try again.')
  }

  if (updateError) {
    alert('Could not update file. Please try again.')
  }

  function handleSetMarkdownCursorPosition(currentCursorPosition: IPosition) {
    localState.cursorPositionVar({
      ...currentCursorPosition,
      __typename: 'Position',
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
        onChange={(value) => updateFile(currentPath, value)}
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
                  code: (props) => CodeRenderer({ ...props, inline: false }),
                  inlineCode: (props) =>
                    CodeRenderer({ ...props, inline: true }),
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
