import monacoEditor from 'monaco-editor'
import React, { useContext, useImperativeHandle, useRef } from 'react'
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
  EditorWillMount,
} from 'react-monaco-editor'
import { COLOR_MODE } from '../../../enums'
import { ColorModeContext } from '../../utility'
import { styled } from '../../../theme'
import { Spinner } from '..'

const theme = {
  [COLOR_MODE.DARK]: 'monokai',
  [COLOR_MODE.LIGHT]: 'vs',
}

const Style = styled.div`
  position: relative;
  grid-area: editor;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export interface Ref {
  insertTextAtCursorPosition: (text: string) => void
}

interface IMonacoEditor {
  editor: monacoEditor.editor.IStandaloneCodeEditor
  monaco: typeof monacoEditor
}

interface IMonaco {
  onChange: (newValue: string) => void
  value: string
  loading: boolean
}

export const Monaco = React.forwardRef(
  ({ onChange, value, loading }: IMonaco, ref) => {
    const monacoRef = useRef<IMonacoEditor | null>(null)
    const { colorMode } = useContext(ColorModeContext)

    const editorWillMount: EditorWillMount = monaco => {
      const Monokai = require('monaco-themes/themes/Monokai.json')
      monaco.editor.defineTheme('monokai', Monokai)
      monaco.editor.setTheme('monokai')
    }

    const editorDidMount: EditorDidMount = (edit, monaco) => {
      monacoRef.current = {
        editor: edit,
        monaco,
      }
    }

    useImperativeHandle(
      ref,
      (): Ref => ({
        insertTextAtCursorPosition,
      })
    )

    function insertTextAtCursorPosition(text: string) {
      try {
        const line = monacoRef?.current?.editor.getPosition()
        const monaco = monacoRef?.current?.monaco

        if (!line || !monaco) {
          throw new Error('Editor unavailable')
        }

        const range = new monaco.Range(
          line.lineNumber,
          line.column,
          line.lineNumber,
          line.column
        )

        const id = { major: 1, minor: 1 }
        const op = {
          identifier: id,
          range: range,
          text: text,
          forceMoveMarkers: true,
        }

        monacoRef?.current?.editor.executeEdits('my-source', [op])
      } catch (error) {
        console.log('ERROR:', error.message)
      }
    }

    const handleOnChange: ChangeHandler = (newValue, event) => {
      if (event.isFlush) {
        return
      }
      onChange(newValue)
    }

    return (
      <Style>
        {loading && <Spinner />}
        <MonacoEditor
          width="100%"
          height="100%"
          language="markdown"
          theme={theme[colorMode]}
          options={{
            automaticLayout: true,
            fontSize: 11,
            highlightActiveIndentGuide: false,
            lineDecorationsWidth: 0,
            lineNumbers: 'off',
            minimap: { enabled: false },
            overviewRulerBorder: false,
            renderIndentGuides: false,
            scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
            selectOnLineNumbers: true,
            wordWrap: 'on',
          }}
          value={value}
          onChange={handleOnChange}
          editorWillMount={editorWillMount}
          editorDidMount={editorDidMount}
        />
      </Style>
    )
  }
)
