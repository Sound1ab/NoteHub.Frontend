import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import parse from 'remark-parse'
import { remarkToSlate, slateToRemark } from 'remark-slate-transformer'
import stringify from 'remark-stringify'
import { Editor, Node, createEditor } from 'slate'
import { Editable, Slate as SlateReact, withReact } from 'slate-react'
import styled from 'styled-components'
import unified from 'unified'

import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useUnstagedChanges } from '../../../../../hooks/recoil/useUnstagedChanges'
import { debounce } from '../../../../../utils/debounce'
import { Element } from './Element/Element'
import { Leaf } from './Leaf/Leaf'
import { withShortcuts } from './plugins/withShortcuts'
import { insertLink } from './utils/insertLink'
import { mdastFlattenBlockQuote } from './utils/mdastFlattenBlockQuote'
import { flattenListItemParagraphs } from './utils/mdastFlattenListItem'
import { toggleInlineStyle } from './utils/toggleInlineStyle'

interface ISlate {
  children: ReactNode
  fileContent: string
}

export function Slate({ children, fileContent }: ISlate) {
  const editor = useMemo(() => withReact(withShortcuts(createEditor())), [])
  const [value, setValue] = useState<Node[]>([])

  const [, setUnstagedChanges] = useUnstagedChanges()
  const [activePath] = useActivePath()
  const [{ writeFile }] = useFs()
  const [{ getUnstagedChanges }] = useGit()

  const writeContentToFSAndCheckUnstagedChanges = useCallback(
    debounce(async (markdown: string) => {
      if (!activePath) return

      await writeFile(activePath, markdown)

      await setUnstagedChanges(await getUnstagedChanges())
    }, 200),
    [activePath, writeFile, setUnstagedChanges, getUnstagedChanges]
  )

  // Load slate with initial markdown
  useEffect(() => {
    const processor = unified()
      .use(parse)
      .use(flattenListItemParagraphs)
      .use(mdastFlattenBlockQuote)
      .use(remarkToSlate)

    processor.process(fileContent, (err, file) => {
      if (err) throw err

      setValue(file.result as any)
    })
  }, [fileContent, editor])

  const handleOnChange = useCallback(
    (value: Node[]) => {
      const processor = unified().use(slateToRemark).use(stringify)

      const ast = processor.runSync({
        type: 'root',
        children: value,
      })

      const text = processor.stringify(ast)

      writeContentToFSAndCheckUnstagedChanges(text)

      setValue(value)
    },
    [writeContentToFSAndCheckUnstagedChanges]
  )

  const renderElement = useCallback(
    (props) => (
      <Element {...props} editor={editor}>
        {props.children}
      </Element>
    ),
    [editor]
  )

  const renderLeaf = useCallback(
    (props) => <Leaf {...props}>{props.children}</Leaf>,
    []
  )

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!event.ctrlKey) {
      return
    }

    switch (event.key) {
      case 'b': {
        event.preventDefault()
        toggleInlineStyle(editor, 'bold')
        break
      }
      case 'i': {
        event.preventDefault()
        toggleInlineStyle(editor, 'italic')
        break
      }
      case 'l': {
        event.preventDefault()
        const selection = editor.selection

        if (!selection) return

        const url = 'http://google.com'

        const text = Editor.string(editor, selection)

        insertLink(editor, url, text)
        break
      }
    }
  }

  return (
    <Wrapper>
      <SlateReact editor={editor} value={value} onChange={handleOnChange}>
        <StyledEditable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
        {children}
      </SlateReact>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  flex: 1 1 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  position: relative;

  height: 100%;
  justify-content: center;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`

const StyledEditable = styled(Editable)`
  max-width: 90ch;
  width: 100%;
`
