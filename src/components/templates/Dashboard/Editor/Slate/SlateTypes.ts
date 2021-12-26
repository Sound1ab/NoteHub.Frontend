export type CustomText = {
  text: string
  bold: boolean
  italic: boolean
  inlineCode: boolean
}

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  depth: number
  children: CustomText[]
}

export type LinkElement = {
  type: 'link'
  url: string
  children: CustomText[]
}

export type ListElement = {
  type: 'list'
  ordered: boolean
  children: CustomText[]
}

export type ListItemElement = {
  type: 'listItem'
  children: CustomText[]
}

export type BlockquoteElement = {
  type: 'blockquote'
  children: CustomText[]
}

export type ThematicBreakElement = {
  type: 'thematicBreak'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type TableElement = {
  type: 'table'
  children: TableRowElement[]
}

export type TableRowElement = {
  type: 'tableRow'
  header: boolean
  footer: boolean
  children: TableCellElement[]
}

export type TableCellElement = {
  type: 'tableCell'
  header: boolean
  children: CustomText[]
}

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | LinkElement
  | ListElement
  | ListItemElement
  | BlockquoteElement
  | ThematicBreakElement
  | CodeElement
  | TableElement
  | TableRowElement
  | TableCellElement
