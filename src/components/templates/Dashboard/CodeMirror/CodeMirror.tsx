import { EditorFromTextArea, Editor as EditorType } from 'codemirror'
import React, {
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { CONTAINER_ID } from '../../../../enums'
import { useCodeMirror } from '../../../../hooks/codeMirror/useCodeMirror'
import { useFs } from '../../../../hooks/fs/useFs'
import { useGit } from '../../../../hooks/git/useGit'
import { useEquality } from '../../../../hooks/recoil/retext/useEquality'
import { useIndefiniteArticle } from '../../../../hooks/recoil/retext/useIndefiniteArticle'
import { useReadability } from '../../../../hooks/recoil/retext/useReadability'
import { useRepeatedWords } from '../../../../hooks/recoil/retext/useRepeatedWords'
import { useSpelling } from '../../../../hooks/recoil/retext/useSpelling'
import { useFont } from '../../../../hooks/recoil/theme/useFont'
import { useFullWidth } from '../../../../hooks/recoil/theme/useFullWidth'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useUnstagedChanges } from '../../../../hooks/recoil/useUnstagedChanges'
import { process } from '../../../../services/retext/process'
import { debounce } from '../../../../utils/debounce'
import { Retext_Settings } from '../../../apollo/generated_components_typings'
import { StyledCodeMirror } from './StyledCodeMirror'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HyperMd = require('hypermd')

interface IContextProps {
  editor: EditorFromTextArea | null
  textAreaRef: Ref<HTMLTextAreaElement>
  wrapperRef: RefObject<HTMLElement>
}

export const CodeMirrorContext = React.createContext<Partial<IContextProps>>({})

interface ICodeMirror {
  children: ReactNode
  fileContent: string
}

export const CodeMirror = ({ children, fileContent }: ICodeMirror) => {
  const textArea = useRef<HTMLTextAreaElement | null>(null)
  const codeMirrorRef = useRef<EditorFromTextArea | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [equality] = useEquality()
  const [indefiniteArticle] = useIndefiniteArticle()
  const [readability] = useReadability()
  const [repeatedWords] = useRepeatedWords()
  const [spelling] = useSpelling()

  const [font] = useFont()
  const [fullWidth] = useFullWidth()

  const [, setUnstagedChanges] = useUnstagedChanges()
  const [activePath] = useActivePath()
  const [{ writeFile }] = useFs()
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

  const processRetext = useCallback(
    (editor: EditorType) => {
      let settings: Retext_Settings[] = []

      if (equality) {
        settings = [...settings, Retext_Settings.Equality]
      }
      if (indefiniteArticle) {
        settings = [...settings, Retext_Settings.IndefiniteArticle]
      }
      if (readability) {
        settings = [...settings, Retext_Settings.Readability]
      }
      if (repeatedWords) {
        settings = [...settings, Retext_Settings.RepeatedWords]
      }
      if (spelling) {
        settings = [...settings, Retext_Settings.Spell]
      }

      process(editor.getValue(), settings).then((result) => {
        clearMarkers()
        createMarkers(editor, result)
      })
    },
    [
      equality,
      indefiniteArticle,
      readability,
      repeatedWords,
      spelling,
      clearMarkers,
      createMarkers,
    ]
  )

  // React when activeRetextSettings changes
  useEffect(() => {
    const editor = codeMirrorRef.current

    if (!editor) {
      return
    }

    if (
      equality ||
      indefiniteArticle ||
      readability ||
      repeatedWords ||
      spelling
    ) {
      processRetext(editor)
    } else {
      clearMarkers()
    }
  }, [
    equality,
    indefiniteArticle,
    readability,
    repeatedWords,
    spelling,
    clearMarkers,
    processRetext,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const writeContentToFSAndCheckUnstagedChanges = useCallback(
    debounce(async (editor: EditorType) => {
      processRetext(editor)

      await writeFile(activePath, editor.getValue())

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
      writeContentToFSAndCheckUnstagedChanges(editor)
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

    if (!editor) return

    editor.setValue(fileContent)
  }, [fileContent])

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const editor = codeMirrorRef.current

    if (!editor) return

    displayWidget(
      editor,
      {
        clientX: e.clientX,
        clientY: e.clientY,
      },
      window.pageYOffset
    )
  }

  return (
    <CodeMirrorContext.Provider
      value={{
        editor: codeMirrorRef.current,
        textAreaRef: textArea,
        wrapperRef,
      }}
    >
      <>
        <StyledCodeMirror
          id={CONTAINER_ID.EDITOR}
          isFullWidth={fullWidth}
          font={font}
          onScroll={() => removeWidget()}
          onClick={handleClick}
          ref={wrapperRef}
        >
          {children}
          <textarea ref={textArea} />
        </StyledCodeMirror>
      </>
    </CodeMirrorContext.Provider>
  )
}
