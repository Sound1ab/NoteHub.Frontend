import React, { useEffect, useState } from 'react'
import { styled } from '../../../theme'
import {EXEC_COMMAND} from '../../../enums'

const Style = styled.div`
  position: relative;
  
  .text-editor {
    padding: ${({theme}) => theme.spacing.s};
    resize: none;
    width: 100%;
    height: 100%;
  }
  
  p {
    margin-bottom: 0;
  }
`

interface ITextArea {
  content : string | null
}

const PLACEHOLDER = "Start noting"

export function TextArea({ content = '' }: ITextArea) {
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER)

  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, "p")
  }, [])

  function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
    const containsPlaceholder = (e.target as HTMLElement).innerText.includes(PLACEHOLDER)

    if (containsPlaceholder) {
      setPlaceholder("")
    }
  }

  function handleOnBlur(e: React.FocusEvent<HTMLDivElement>) {
    const containsNoText = (e.target as HTMLElement).innerText === ""

    if (containsNoText) {
      setPlaceholder(PLACEHOLDER)
    }
  }

  function formatDocument(command: EXEC_COMMAND, value = '') {
    document.execCommand(command, false, value)
  }

  return (
    <Style>
      <div className="text-editor" contentEditable onClick={handleOnClick} onBlur={handleOnBlur}>{content || placeholder}</div>
    </Style>
  )
}
