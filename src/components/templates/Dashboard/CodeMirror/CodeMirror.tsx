import { EditorFromTextArea, Editor as EditorType } from 'codemirror'
import React, { ReactNode, Ref, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { useCodeMirror } from '../../../../hooks/codeMirror/useCodeMirror'
import { useFs } from '../../../../hooks/fs/useFs'
import { useGit } from '../../../../hooks/git/useGit'
import { useReadActiveRetextSettings } from '../../../../hooks/localState/useReadActiveRetextSettings'
import { useReadThemeSettings } from '../../../../hooks/localState/useReadThemeSettings'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useUnstagedChanges } from '../../../../hooks/recoil/useUnstagedChanges'
import { useWidget } from '../../../../hooks/recoil/useWidget'
import useDeepCompareEffect from '../../../../hooks/utils/useDeepCompareEffect'
import { process } from '../../../../services/retext/process'
import { debounce } from '../../../../utils/debounce'
import { isFile } from '../../../../utils/isFile'
import { ContextMenu } from './ContextMenu/ContextMenu'
import { StyledCodeMirror } from './StyledCodeMirror'
import { Widget } from './Widget/Widget'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HyperMd = require('hypermd')

interface IContextProps {
  editor: EditorFromTextArea | null
  textAreaRef: Ref<HTMLTextAreaElement>
}

export const CodeMirrorContext = React.createContext<Partial<IContextProps>>({})

interface ICodeMirror {
  children: (ReactNode: ReactNode) => ReactNode
}

export const CodeMirror = ({ children }: ICodeMirror) => {
  const target = useRef<HTMLDivElement | null>(null)
  const textArea = useRef<HTMLTextAreaElement | null>(null)
  const codeMirrorRef = useRef<EditorFromTextArea | null>(null)

  const { isFullWidth, font } = useReadThemeSettings()
  const { activeRetextSettings } = useReadActiveRetextSettings()
  const [, setUnstagedChanges] = useUnstagedChanges()
  const [activePath] = useActivePath()
  const [widget] = useWidget()
  const [{ writeFile, readFile }] = useFs()
  const [{ getUnstagedChanges }] = useGit()
  const [
    {
      clearMarkers,
      createMarkers,
      setCursorPosition,
      displayWidget,
      removeWidget,
    },
  ] = useCodeMirror()

  // React wen activeRetextSettings changes
  useDeepCompareEffect(() => {
    const editor = codeMirrorRef.current

    if (!editor) {
      return
    }

    if (activeRetextSettings && activeRetextSettings.length > 0) {
      processRetext(editor.getValue())
    } else {
      clearMarkers()
    }
  }, [activeRetextSettings, clearMarkers])

  const processRetext = useCallback(
    (fileContent) => {
      const editor = codeMirrorRef.current

      if (!editor) {
        return
      }

      if (!activeRetextSettings || activeRetextSettings.length === 0) {
        return
      }

      process(fileContent, activeRetextSettings).then((result) => {
        clearMarkers()
        createMarkers(editor, result)
      })
    },
    [activeRetextSettings, clearMarkers, createMarkers]
  )

  const writeContentToFSAndCheckUnstagedChanges = useCallback(
    debounce(async (fileContent) => {
      processRetext(fileContent)

      await writeFile(activePath, fileContent)

      await setUnstagedChanges(await getUnstagedChanges())
    }, 200),
    [
      processRetext,
      activePath,
      writeFile,
      setUnstagedChanges,
      getUnstagedChanges,
    ]
  )

  // Initial load of editor and setting actions for use in context menu
  useEffect(() => {
    if (!textArea || !textArea.current || codeMirrorRef.current) return

    const editor = HyperMd.fromTextArea(textArea.current, {
      lineNumbers: false,
      lineWrapping: true,
      viewportMargin: Infinity,
      foldGutter: false,
    })

    codeMirrorRef.current = editor

    editor.getDoc().clearHistory()
  }, [])

  // Setup event handlers on editor
  useEffect(() => {
    const editor = codeMirrorRef.current

    if (!editor) {
      return
    }

    const handleChange = async (editor: EditorType) => {
      writeContentToFSAndCheckUnstagedChanges(editor.getValue())
    }
    const handleCursorActivity = (editor: EditorType) => {
      setCursorPosition?.(editor.getCursor())
    }

    editor.on('change', handleChange)
    editor.on('cursorActivity', handleCursorActivity)
    return () => {
      editor.off('change', handleChange)
      editor.off('cursorActivity', handleCursorActivity)
    }
  }, [writeContentToFSAndCheckUnstagedChanges, setCursorPosition])

  useEffect(() => {
    const editor = codeMirrorRef.current

    async function loadContentFromFS() {
      if (!editor || !isFile(activePath)) return

      editor.setValue((await readFile(activePath)) ?? '')
    }

    loadContentFromFS()
  }, [activePath, readFile])

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const editor = codeMirrorRef.current
    const scroll = target.current

    if (!editor || !scroll) {
      return
    }

    displayWidget(
      editor,
      {
        clientX: e.clientX,
        clientY: e.clientY,
      },
      scroll.scrollTop
    )
  }

  return (
    <CodeMirrorContext.Provider
      value={{ editor: codeMirrorRef.current, textAreaRef: textArea }}
    >
      {codeMirrorRef.current && <ContextMenu targetRef={target} />}
      {children(
        <Wrapper id={CONTAINER_ID.EDITOR}>
          {widget && <Widget />}
          <StyledCodeMirror
            isFullWidth={isFullWidth}
            font={font}
            onScroll={() => removeWidget()}
            onClick={handleClick}
          >
            <textarea ref={textArea} />
          </StyledCodeMirror>
        </Wrapper>
      )}
    </CodeMirrorContext.Provider>
  )
}

const Wrapper = styled.div`
  flex: 0 0 100%; // Needed for scroll snap
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: center;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`
