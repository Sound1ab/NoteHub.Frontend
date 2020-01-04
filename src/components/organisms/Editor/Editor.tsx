import React from 'react'

import { useFile, useReadCurrentFileName, useReadIsEdit } from '../../../hooks'
import { MarkdownPreview } from '../../atoms'
import { MarkdownEditor, MarkdownEditorSkeleton } from '../../molecules'

export function Editor() {
  const { isEdit } = useReadIsEdit()
  const { loading } = useFile()
  const { currentFileName } = useReadCurrentFileName()

  if (!currentFileName) {
    return null
  }

  if (loading) {
    return <MarkdownEditorSkeleton />
  }

  return isEdit ? <MarkdownEditor /> : <MarkdownPreview />
}
