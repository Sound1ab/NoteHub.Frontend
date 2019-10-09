import MarkdownIt from 'markdown-it'
import React, { useContext } from 'react'
import { styled } from '../../../theme'
import { EditorContext } from '../../molecules'

const Style = styled.div`
  position: relative;
`

const md = new MarkdownIt()

export function MarkdownPreview() {
  const editorContext = useContext(EditorContext)

  if (!editorContext) {
    return null
  }

  const html = md.render(editorContext.value)

  return <Style>
    <div dangerouslySetInnerHTML={{ __html: html }}/>
  </Style>
}
