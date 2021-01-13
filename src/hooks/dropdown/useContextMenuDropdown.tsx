import { useCodeMirror } from '../codeMirror/useCodeMirror'
import { useEditor } from '../codeMirror/useEditor'
import { useDropzone } from '../utils/useDropzone'

export function useContextMenuDropdown() {
  const { editor } = useEditor()
  const { Dropzone, openFileDialog } = useDropzone()
  const [
    {
      toggleBold,
      drawTable,
      drawLink,
      toggleBlockquote,
      toggleCodeBlock,
      drawHorizontalRule,
      toggleItalic,
      toggleUnorderedList,
      toggleOrderedList,
    },
  ] = useCodeMirror()

  const items = [
    {
      heading: 'Text',
      onClick: () => toggleItalic(editor),
      title: 'Italic',
      icon: 'italic' as const,
    },
    {
      onClick: () => toggleBold(editor),
      title: 'Bold',
      icon: 'bold' as const,
    },
    {
      onClick: () => toggleBlockquote(editor),
      title: 'Quote',
      icon: 'quote-right' as const,
      hasSeparator: true,
    },
    {
      heading: 'List',
      onClick: () => toggleOrderedList(editor),
      title: 'Ordered',
      icon: 'list-ol' as const,
    },
    {
      onClick: () => toggleUnorderedList(editor),
      title: 'Unordered',
      icon: 'list' as const,
      hasSeparator: true,
    },
    {
      heading: 'Insert',
      onClick: () => toggleCodeBlock(editor),
      title: 'Code block',
      icon: 'code' as const,
    },
    {
      onClick: () => drawHorizontalRule(editor),
      title: 'Horizontal line',
      icon: 'minus' as const,
    },
    {
      onClick: () => drawTable(editor),
      title: 'Table',
      icon: 'table' as const,
    },
    {
      onClick: () => drawLink(editor),
      title: 'Link',
      icon: 'link' as const,
    },
    {
      onClick: openFileDialog,
      title: 'Image',
      icon: 'image' as const,
    },
  ]

  return { items, Dropzone }
}
