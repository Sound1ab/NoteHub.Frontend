import React, { useContext, useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'
import { useStore } from '../../../hooks'

import 'brace/mode/markdown'
import 'brace/theme/dracula'
import 'brace/theme/github'
import { Spinner } from '..'
import { COLOR_MODE } from '../../../enums'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { styled } from '../../../theme'
import { ColorModeContext } from '../../utility'
import { DropzoneContext } from '../Dropzone/Dropzone'

const Style = styled.div`
  position: relative;
  grid-area: editor;
  width: 70%;
  margin: 0 auto;
`

export function Ace() {
  const {colorMode} = useContext(ColorModeContext)
  const [handleFileSelect, dropzoneLoading] = useContext(DropzoneContext)
  const aceEditor = useRef<any>(null)
  const [value, setValue] = useState('')
  const [state] = useStore()
  const { file, loading } = useReadFile(
    state.user.username,
    state.repo.activeRepo.name,
    state.repo.activeFile.filename
  )
  const updateFile = useUpdateFile(
    state.user.username,
    state.repo.activeRepo.name,
    state.repo.activeFile.filename
  )

  useEffect(() => {
    setValue((file && file.content) || '')
  }, [file])

  function handleChange(newValue: string) {
    setValue(newValue)
  }

  async function handleBlur(e: React.MouseEvent<HTMLDivElement>, editor: any) {
    if (!state.repo.activeFile) {
      return
    }
    await updateFile({
      variables: {
        input: {
          // excerpt: editor.session.getLine(0),
          content: editor.getValue(),
          filename: state.repo.activeFile.filename,
          repo: state.repo.activeRepo.name,
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
    <Style>
      {(dropzoneLoading || loading) && <Spinner />}
      <AceEditor
        ref={aceEditor}
        value={value}
        mode="markdown"
        theme={colorMode === COLOR_MODE.LIGHT ? 'github' : 'dracula'}
        name="UNIQUE_ID_OF_DIV"
        height="100%"
        width="100%"
        onChange={handleChange}
        onBlur={handleBlur as any}
        wrapEnabled={true}
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        commands={[
          {
            bindKey: { win: 'Ctrl-M', mac: 'Command-M' },
            exec: uploadImage,
            name: 'myCommand',
          },
        ]}
      />
    </Style>
  )
}
