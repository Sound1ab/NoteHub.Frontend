import React from 'react'

import { useReadIsEdit } from '../../../hooks'
import { MarkdownPreview } from '../../atoms'
import { MarkdownEditor } from '../../molecules'

export function Editor() {
  const { isEdit } = useReadIsEdit()

  return isEdit ? <MarkdownEditor /> : <MarkdownPreview />
}
