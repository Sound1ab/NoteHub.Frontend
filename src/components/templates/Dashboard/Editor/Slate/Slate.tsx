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
import { Editor, Node, NodeEntry, Range, Transforms, createEditor } from 'slate'
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
import { decorateCodeBlock } from './utils/decorateCodeBlock'
import { inlineCodeCursorBehaviour } from './utils/inlineCodeCursorBehaviour'
import { insertLink } from './utils/insertLink'
import { isInlineActive } from './utils/isInlineActive'
import { isTypeActive } from './utils/isTypeActive'
import { mdastAppendTextToEmptyListItem } from './utils/mdastAppendTextToEmptyListItem'
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
      .use(remarkToSlate)
      .use(flattenListItemParagraphs)
      .use(mdastFlattenBlockQuote)
      .use(mdastAppendTextToEmptyListItem)

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
    if (event.key === 'ArrowRight') {
      if (isInlineActive(editor, 'inlineCode')) {
        inlineCodeCursorBehaviour(editor)
      }
    }

    if (event.metaKey) {
      switch (event.key) {
        case 'Enter': {
          if (
            !isTypeActive(editor, 'code') &&
            !isTypeActive(editor, 'blockquote')
          )
            return

          event.preventDefault()
          Transforms.insertText(editor, '\n')
          break
        }
      }
    }

    if (event.ctrlKey) {
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
          const { selection } = editor

          if (!selection || !Range.isCollapsed(selection)) return

          const url = 'http://google.com'

          const text = Editor.string(editor, selection)

          insertLink(editor, url, text)
          break
        }
        case 'c': {
          event.preventDefault()
          toggleInlineStyle(editor, 'inlineCode')
          break
        }
      }
    }
  }

  function handleClick(event: React.MouseEvent) {
    if (event.metaKey) {
      if (!isTypeActive(editor, 'link')) return

      const range = editor.selection

      if (!range) return

      const {
        anchor: { path },
      } = range

      // Getting the parent of a text node
      const node = Node.parent(editor, path)

      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: node.url,
      }).click()
    }
  }

  const decorate = useCallback(([node, path]: NodeEntry) => {
    if (node?.type === 'code') {
      return decorateCodeBlock([node, path])
    }

    return []
  }, [])

  return (
    <Wrapper>
      <SlateReact editor={editor} value={value} onChange={handleOnChange}>
        <StyledEditable
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
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
