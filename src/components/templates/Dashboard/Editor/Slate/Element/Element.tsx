import React from 'react'
import { Editor } from 'slate'
import { RenderElementProps } from 'slate-react/dist/components/editable'

import { BlockQuote } from '../../../../../atoms/BlockQuote/BlockQuote'
import { CodeBlock } from '../../../../../atoms/CodeBlock/CodeBlock'
import { Heading } from '../../../../../atoms/Heading/Heading'
import { Hr } from '../../../../../atoms/Hr/Hr'
import { Link } from '../../../../../atoms/Link/Link'
import { List } from '../../../../../atoms/List/List'
import { ListItem } from '../../../../../atoms/ListItem/ListItem'
import { Paragraph } from '../../../../../atoms/Paragraph/Paragraph'
import { Table } from '../../../../../atoms/Table/Table'
import { TableCell } from '../../../../../atoms/Table/TableCell/TableCell'
import { TableRow } from '../../../../../atoms/Table/TableRow/TableRow'
import { CustomElement } from '../SlateTypes'

interface IElement extends RenderElementProps {
  editor: Editor
  element: CustomElement
}

export function Element(props: IElement) {
  // const baseElementRenderer: Record<string, JSX.Element> = {
  // softbreak: () => <span {...attributes}> {children}</span>,
  // linebreak: () => (
  //   <span {...attributes}>
  //     <span contentEditable={false} style={{ userSelect: 'none' }}>
  //       <br />
  //     </span>
  //     {children}
  //   </span>
  // ),
  // html_block: () => <pre {...attributes}>{children}</pre>,
  // image: () => <ImageElement {...props} />,
  // html_inline: () => (
  //   <span {...attributes}>
  //     {(element.data as any).content}
  //     {children}
  //   </span>
  // ),
  // }

  switch (props.element.type) {
    case 'paragraph':
      return <Paragraph {...props}>{props.children}</Paragraph>
    case 'heading':
      return <Heading {...props}>{props.children}</Heading>
    case 'link':
      return (
        <Link {...props} link={props.element.url}>
          {props.children}
        </Link>
      )
    case 'list':
      return <List {...props}>{props.children}</List>
    case 'listItem':
      return <ListItem {...props}>{props.children}</ListItem>
    case 'blockquote':
      return <BlockQuote {...props}>{props.children}</BlockQuote>
    case 'thematicBreak':
      return <Hr {...props}>{props.children}</Hr>
    case 'code':
      return <CodeBlock {...props}>{props.children}</CodeBlock>
    case 'table':
      return <Table {...props}>{props.children}</Table>
    case 'tableRow':
      return (
        <TableRow
          {...props}
          header={props.element.header}
          footer={props.element.footer}
        >
          {props.children}
        </TableRow>
      )
    case 'tableCell':
      return (
        <TableCell {...props} header={props.element.header}>
          {props.children}
        </TableCell>
      )
    default:
      console.log(
        `Didn't know how to render ${JSON.stringify(props.element, null, 2)}`
      )
      return <p {...props.attributes}>{props.children}</p>
  }
}
