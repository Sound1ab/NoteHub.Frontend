import React, { useEffect, useState } from 'react'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
  
  .text-editor {
    resize: none;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.colors.brand};
  }
  
  p {
    margin-bottom: 0;
  }
`

interface ITextArea {
  dummyProp? : string
}

const PLACEHOLDER = "Start noting"

enum EXEC_COMMAND {
  UNDERLINE = 'underline'
}

export function TextArea({ dummyProp = '' }: ITextArea) {
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
      <button onClick={formatDocument.bind(null, EXEC_COMMAND.UNDERLINE, '')}>click</button>
      <div className="text-editor" contentEditable onClick={handleOnClick} onBlur={handleOnBlur}>{placeholder}</div>
    </Style>
  )
}
