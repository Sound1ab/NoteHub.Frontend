import React from 'react'
import { Editor } from 'slate'
import { RenderElementProps } from 'slate-react/dist/components/editable'

import { BlockQuote } from '../../../../../atoms/BlockQuote/BlockQuote'
import { Heading } from '../../../../../atoms/Heading/Heading'
import { Link } from '../../../../../atoms/Link/Link'
import { List } from '../../../../../atoms/List/List'
import { ListItem } from '../../../../../atoms/ListItem/ListItem'
import { Paragraph } from '../../../../../atoms/Paragraph/Paragraph'

interface IElement extends RenderElementProps {
  editor: Editor
  element: {
    link?: string
    children: []
    type: string
  }
}

export function Element(props: IElement) {
  const baseElementRenderer: Record<string, JSX.Element> = {
    paragraph: <Paragraph {...props}>{props.children}</Paragraph>,
    heading: <Heading {...props}>{props.children}</Heading>,
    list: <List {...props}>{props.children}</List>,
    listItem: <ListItem {...props}>{props.children}</ListItem>,
    blockquote: <BlockQuote {...props}>{props.children}</BlockQuote>,
    link: (
      <Link {...props} link={props.element.link}>
        {props.children}
      </Link>
    ),
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
    // code_block: () => <pre {...attributes}>{children}</pre>,
    // image: () => <ImageElement {...props} />,
    // horizontal_rule: () => <hr />,
    // html_inline: () => (
    //   <span {...attributes}>
    //     {(element.data as any).content}
    //     {children}
    //   </span>
    // ),
  }

  const component = baseElementRenderer[props.element.type as any]

  if (!component) {
    console.log(
      `Didn't know how to render ${JSON.stringify(props.element, null, 2)}`
    )
    return <p {...props.attributes}>{props.children}</p>
  }

  return component
}
