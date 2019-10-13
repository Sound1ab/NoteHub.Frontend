import monacoEditor from 'monaco-editor'
import React, { useContext, useRef } from 'react'
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount,
} from 'react-monaco-editor'
import { COLOR_MODE } from '../../../enums'
import { EditorContext } from '../../molecules'

const theme = {
  [COLOR_MODE.DARK]: 'monokai',
  [COLOR_MODE.LIGHT]: 'vs',
}

interface IMonaco {
  editor: monacoEditor.editor.IStandaloneCodeEditor
  monaco: typeof monacoEditor
}

export function Monaco() {
  const editorContext = useContext(EditorContext)
  const monacoRef = useRef<IMonaco | null>(null)

  if (!editorContext) {
    return null
  }

  const { value, uploadImage, colorMode, saveFile, setValue } = editorContext

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
    edit.onDidBlurEditorText(saveFile)
  }

  if (
    monacoRef &&
    monacoRef.current &&
    monacoRef.current.editor &&
    monacoRef.current.monaco
  ) {
    const monaco = monacoRef.current.monaco
    const edit = monacoRef.current.editor
    edit.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      saveFile()
    })
    edit.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I, () => {
      uploadImage()
    })
  }

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="markdown"
      theme={theme[colorMode]}
      value={value}
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
      onChange={setValue}
      editorWillMount={editorWillMount}
      editorDidMount={editorDidMount}
    />
  )
}
