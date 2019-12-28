import React, { Dispatch, SetStateAction } from 'react'

import { IPosition, useReadIsEdit } from '../../../hooks'
import { MarkdownPreview } from '../../atoms'
import { MarkdownEditor } from '../../molecules'

interface IEditor {
  setMarkdownCursorPosition: Dispatch<SetStateAction<IPosition>>
}

export function Editor({ setMarkdownCursorPosition }: IEditor) {
  const { isEdit } = useReadIsEdit()

  return isEdit ? (
    <MarkdownEditor setPosition={setMarkdownCursorPosition} />
  ) : (
    <MarkdownPreview />
  )
}
