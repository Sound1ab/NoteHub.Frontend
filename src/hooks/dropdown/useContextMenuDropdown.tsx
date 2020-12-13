import { isFile } from '../../utils'
import { useCodeMirror, useDropzone, useReadCurrentPath } from '..'

export function useContextMenuDropdown() {
  const currentPath = useReadCurrentPath()
  const { Dropzone, openFileDialog } = useDropzone()
  const isMarkdownEditorActive = isFile(currentPath)
  const { actions } = useCodeMirror()

  const items = actions
    ? [
        {
          heading: 'Text',
          onClick: actions.toggleItalic,
          title: 'Italic',
          isDisabled: !isMarkdownEditorActive,
          icon: 'italic' as const,
        },
        {
          onClick: actions.toggleBold,
          title: 'Bold',
          isDisabled: !isMarkdownEditorActive,
          icon: 'bold' as const,
        },
        {
          onClick: actions.toggleBlockquote,
          title: 'Quote',
          isDisabled: !isMarkdownEditorActive,
          icon: 'quote-right' as const,
          hasSeparator: true,
        },
        {
          heading: 'List',
          onClick: actions.toggleOrderedList,
          title: 'Ordered',
          isDisabled: !isMarkdownEditorActive,
          icon: 'list-ol' as const,
        },
        {
          onClick: actions.toggleUnorderedList,
          title: 'Unordered',
          isDisabled: !isMarkdownEditorActive,
          icon: 'list' as const,
          hasSeparator: true,
        },
        {
          heading: 'Insert',
          onClick: actions.toggleCodeBlock,
          title: 'Code block',
          isDisabled: !isMarkdownEditorActive,
          icon: 'code' as const,
        },
        {
          onClick: actions.drawHorizontalRule,
          title: 'Horizontal line',
          isDisabled: !isMarkdownEditorActive,
          icon: 'minus' as const,
        },
        {
          onClick: actions.drawTable,
          title: 'Table',
          isDisabled: !isMarkdownEditorActive,
          icon: 'table' as const,
        },
        {
          onClick: actions.drawLink,
          title: 'Link',
          isDisabled: !isMarkdownEditorActive,
          icon: 'link' as const,
        },
        {
          onClick: openFileDialog,
          title: 'Image',
          isDisabled: !isMarkdownEditorActive,
          icon: 'image' as const,
          hasSeparator: true,
        },
        {
          heading: 'Components',
          onClick: actions.drawTableComponent,
          title: 'Table',
          isDisabled: !isMarkdownEditorActive,
          icon: 'table' as const,
        },
      ]
    : null

  return { items, Dropzone }
}
