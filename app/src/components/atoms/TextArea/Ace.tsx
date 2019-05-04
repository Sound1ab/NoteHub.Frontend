import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { useStore } from '../../../hooks'

import 'brace/mode/markdown'
import 'brace/theme/github'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'

export function Ace() {
  const [value, setValue] = useState('')
  const [state] = useStore()
  const note = useReadFile(
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
    setValue((note && note.content) || '')
  }, [note])

  function handleChange(newValue: string) {
    setValue(newValue)
  }

  async function handleBlur(e: React.MouseEvent<HTMLDivElement>, editor: any) {
    if (!state.notebook.activeNote) {
      alert('No active note')
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

  return (
    <AceEditor
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
    />
  )
}
