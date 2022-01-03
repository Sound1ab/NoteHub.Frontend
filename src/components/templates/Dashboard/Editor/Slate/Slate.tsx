import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  BaseEditor,
  Descendant,
  NodeEntry,
  Range as SlateRange,
  createEditor,
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  Slate as SlateReact,
  withReact,
} from 'slate-react'
import styled from 'styled-components'

import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useSlateValue } from '../../../../../hooks/recoil/useSlateValue'
import { useUnstagedChanges } from '../../../../../hooks/recoil/useUnstagedChanges'
import { useModalToggle } from '../../../../../hooks/utils/useModalToggle'
import { debounce } from '../../../../../utils/debounce'
import { Element } from './Element/Element'
import { HyperLinkModal } from './HyperLinkModal/HyperLinkModal'
import { Leaf } from './Leaf/Leaf'
import { CustomElement, CustomText } from './SlateTypes'
import { openLink } from './utils/commands/link/openLink'
import { decorateCodeBlock } from './utils/decorators/decorateCodeBlock'
import { handleKeyDown } from './utils/handlers/handleKeyDown'
import { withChecklists } from './utils/plugins/withChecklists'
import { withLinks } from './utils/plugins/withLinks'
import { withLists } from './utils/plugins/withLists'
import { withShortcuts } from './utils/plugins/withShortcuts'
import { withTables } from './utils/plugins/withTables'
import { slateToRemark } from './utils/unifed/slateToRemark'

declare module 'slate' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export function Slate() {
  const editor = useMemo(
    () =>
      withReact(
        withHistory(
          withChecklists(
            withLinks(withLists(withTables(withShortcuts(createEditor()))))
          )
        )
      ),
    []
  )

  const [, setUnstagedChanges] = useUnstagedChanges()
  const [activePath] = useActivePath()
  const { writeFile } = useFs()
  const { getUnstagedChanges, add, commit, push } = useGit()
  const [slateValue, setSlateValue] = useSlateValue()
  const domRangeRange = useRef<Range | null>(null)
  const { isOpen, setOpen, Portal, ref } = useModalToggle<HTMLDivElement>({
    origin: domRangeRange.current,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const writeContentToFSAndCheckUnstagedChanges = useCallback(
    debounce(async (value: Descendant[]) => {
      const markdown = slateToRemark(value)

      if (!activePath) return

      await writeFile(activePath, markdown)

      await add(activePath)

      await commit()

      await push()
    }, 1000),
    [
      activePath,
      writeFile,
      setUnstagedChanges,
      getUnstagedChanges,
      add,
      commit,
      push,
    ]
  )

  const handleOnChange = useCallback(
    (value: Descendant[]) => {
      if (JSON.stringify(value) === JSON.stringify(slateValue)) return

      setSlateValue?.(value)

      writeContentToFSAndCheckUnstagedChanges(value)
    },
    [writeContentToFSAndCheckUnstagedChanges, setSlateValue, slateValue]
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

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      openLink(editor, event)
    },
    [editor]
  )

  const decorate = useCallback(([node, path]: NodeEntry) => {
    return decorateCodeBlock([node, path])
  }, [])

  const [linkSelection, setLinkSelection] = useState<SlateRange | null>(null)

  const handleOpenHyperLinkModal = useCallback(() => {
    if (!editor.selection) return

    domRangeRange.current = ReactEditor.toDOMRange(editor, editor.selection)

    setLinkSelection(editor.selection)

    setOpen(true)
  }, [editor, setOpen])

  // This is how we dynamically update the slate value after adding the  initial
  // value. See https://github.com/ianstormtaylor/slate/pull/4540
  editor.children = slateValue

  return (
    <Wrapper>
      <SlateReact editor={editor} value={slateValue} onChange={handleOnChange}>
        {isOpen && (
          <Portal>
            <HyperLinkModal
              onClose={() => setOpen(false)}
              modalRef={ref}
              selection={linkSelection}
            />
          </Portal>
        )}
        <StyledEditable
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown({
            editor,
            onOpenHyperLinkModal: handleOpenHyperLinkModal,
          })}
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
