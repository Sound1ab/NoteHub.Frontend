import React, { useCallback, useMemo } from 'react'
import { Editor, Node, NodeEntry, Range, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate as SlateReact, withReact } from 'slate-react'
import styled from 'styled-components'

import { useSlateValue } from '../../../../../hooks/context/useSlateValue'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useUnstagedChanges } from '../../../../../hooks/recoil/useUnstagedChanges'
import { debounce } from '../../../../../utils/debounce'
import { Element } from './Element/Element'
import { Leaf } from './Leaf/Leaf'
import { withShortcuts } from './plugins/withShortcuts'
import { withTables } from './plugins/withTables'
import { inlineCodeCursorBehaviour } from './utils/behaviours/inlineCodeCursorBehaviour'
import { insertLink } from './utils/commands/insertLink'
import { toggleInlineStyle } from './utils/commands/toggleInlineStyle'
import { decorateCodeBlock } from './utils/decorators/decorateCodeBlock'
import { isInlineActive } from './utils/helpers/isInlineActive'
import { isTypeActive } from './utils/helpers/isTypeActive'
import { slateToRemark } from './utils/unifed/slateToRemark'

export function Slate() {
  const editor = useMemo(
    () => withReact(withHistory(withTables(withShortcuts(createEditor())))),
    []
  )
  const [, setUnstagedChanges] = useUnstagedChanges()
  const [activePath] = useActivePath()
  const [{ writeFile }] = useFs()
  const [{ getUnstagedChanges }] = useGit()
  const { slateValue = [], setSlateValue } = useSlateValue()

  console.log('here', slateValue)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const writeContentToFSAndCheckUnstagedChanges = useCallback(
    debounce(async (value: Node[]) => {
      const markdown = slateToRemark(value)

      if (!activePath) return

      await writeFile(activePath, markdown)

      await setUnstagedChanges(await getUnstagedChanges())
    }, 200),
    [activePath, writeFile, setUnstagedChanges, getUnstagedChanges]
  )

  const handleOnChange = useCallback(
    (value: Node[]) => {
      setSlateValue?.(value)

      writeContentToFSAndCheckUnstagedChanges(value)
    },
    [writeContentToFSAndCheckUnstagedChanges, setSlateValue]
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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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

            if (!selection || Range.isCollapsed(selection)) return

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
    },
    [editor]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
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
    },
    [editor]
  )

  const decorate = useCallback(([node, path]: NodeEntry) => {
    if (node?.type === 'code') {
      return decorateCodeBlock([node, path])
    }

    return []
  }, [])

  return (
    <Wrapper>
      <SlateReact editor={editor} value={slateValue} onChange={handleOnChange}>
        <StyledEditable
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        />
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
`

const StyledEditable = styled(Editable)`
  max-width: 90ch;
  width: 100%;
`
