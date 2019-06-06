import React, { useContext, useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'
import { useStore } from '../../../hooks'

import 'brace/mode/markdown'
import 'brace/theme/github'
import { Spinner } from '..'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { DropzoneContext } from '../Dropzone/Dropzone'

export function Ace() {
  const [handleFileSelect, dropzoneLoading] = useContext(DropzoneContext)
  const aceEditor = useRef<any>(null)
  const [value, setValue] = useState('')
  const [state] = useStore()
  const { file, loading } = useReadFile(
    state.user.username,
    state.notebook.activeNotebook,
    state.notebook.activeNote
  )
  const updateFile = useUpdateFile(
    state.user.username,
    state.notebook.activeNotebook,
    state.notebook.activeNote
  )

  useEffect(() => {
    setValue((file && file.content) || '')
  }, [file])

  function handleChange(newValue: string) {
    setValue(newValue)
  }

  async function handleBlur(e: React.MouseEvent<HTMLDivElement>, editor: any) {
    if (!state.notebook.activeNote) {
      return
    }
    await updateFile({
      variables: {
        input: {
          // excerpt: editor.session.getLine(0),
          content: editor.getValue(),
          filename: state.notebook.activeNote,
          repo: state.notebook.activeNotebook,
          username: state.user.username,
        },
      },
    })
  }

  async function uploadImage() {
    const filename = await handleFileSelect()
    insertMarkdownImage(filename)
  }

  function insertMarkdownImage(filename: string) {
    if (aceEditor && aceEditor.current) {
      console.log(aceEditor.current)
      const markdown = `![](images/${filename})`
      aceEditor.current.editor.insert(markdown)
    }
  }

  return (
    <>
      {(dropzoneLoading || loading) && <Spinner />}
      <AceEditor
        ref={aceEditor}
        value={value}
        mode="markdown"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        height="100%"
        width="100%"
        onChange={handleChange}
        onBlur={handleBlur as any}
        wrapEnabled={true}
        editorProps={{ $blockScrolling: true }}
        commands={[
          {
            bindKey: { win: 'Ctrl-M', mac: 'Command-M' },
            exec: uploadImage,
            name: 'myCommand',
          },
        ]}
      />
    </>
  )
}
