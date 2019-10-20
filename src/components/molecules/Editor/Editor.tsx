import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { COLOR_MODE } from '../../../enums'
import { useStore } from '../../../hooks'
import { useReadFile } from '../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { styled } from '../../../theme'
import { css } from 'styled-components'
import {
  DropzoneContext,
  MarkdownPreview,
  Monaco,
  Ref,
  Spinner,
} from '../../atoms'
import { ColorModeContext } from '../../utility'
import { debounce } from '../../../utils'

const Style = styled.div<{ isEdit: boolean }>`
  position: relative;
  grid-area: editor;
  ${({ theme, isEdit }) =>
    isEdit
      ? css`
          padding: ${theme.spacing.xs} 0;
        `
      : css`
          padding: ${theme.spacing.xs};
        `};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`

export const EditorContext = React.createContext<{
  colorMode: COLOR_MODE
  value: string
  onChange: (newValue: string) => void
  uploadImage: () => void
} | null>(null)

interface IEditor {
  children: ReactNode
}

let abortController: AbortController

const debouncedSave = debounce((updateFile, options) => {
  const controller = new window.AbortController()
  abortController = controller

  updateFile({
    ...options,
    context: { fetchOptions: { signal: controller.signal } },
  })
}, 1000)

export function Editor({ children }: IEditor) {
  const value = useRef('')
  const editorRef = useRef<Ref>()
  const { colorMode } = useContext(ColorModeContext)
  const [selectFileAndUpload, dropzoneLoading] = useContext(DropzoneContext)

  const [
    {
      user: { username },
      repo: {
        activeRepo: { name },
        activeFile: { filename },
      },
      toolbar: { isEdit },
    },
  ] = useStore()

  const { file, loading } = useReadFile(username, name, filename)

  const updateFile = useUpdateFile(username, name, filename)

  const path = file && file.path

  useEffect(() => {
    if (!file || !file.content) {
      return
    }
    value.current = file.content
    const editor = editorRef && editorRef.current
    editor && editor.loadValue(value.current)
    return () => editor && editor.loadValue('')
  }, [path])

  useEffect(() => {
    editorRef && editorRef.current && editorRef.current.loadValue(value.current)
  }, [isEdit])

  function onChange(newValue: string) {
    if (!file || !file.content) {
      return
    }

    if (newValue === value.current) {
      return
    }

    value.current = newValue

    abortController && abortController.abort()

    debouncedSave(updateFile, {
      variables: {
        input: {
          content: value.current,
          filename,
          repo: name,
          username: username,
        },
      },
    })
  }

  async function uploadImage() {
    const line =
      editorRef && editorRef.current && editorRef.current.getPosition()
    if (!line) {
      return
    }
    const monaco = editorRef && editorRef.current && editorRef.current.monaco
    if (!monaco) {
      return
    }
    const filename = await selectFileAndUpload()
    const range = new monaco.Range(
      line.lineNumber,
      line.column,
      line.lineNumber,
      line.column
    )
    const id = { major: 1, minor: 1 }
    const text = `![](images/${filename})`
    const op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true,
    }
    editorRef &&
      editorRef.current &&
      editorRef.current.executeEdits('my-source', [op])
  }

  return (
    <EditorContext.Provider
      value={{ colorMode, value: value.current, onChange, uploadImage }}
    >
      {children}
      <Style isEdit={isEdit}>
        {(dropzoneLoading || loading) && <Spinner />}

        {isEdit ? <Monaco ref={editorRef} /> : <MarkdownPreview />}
      </Style>
    </EditorContext.Provider>
  )
}
