import React, { useState } from 'react'

import { useCreateFile } from '../../../hooks'
import { styled } from '../../../theme'
import { InlineInput } from '../InlineInput/InlineInput'

const Style = styled.div`
  position: relative;
  &:after {
    content: '.md';
    color: ${({ theme }) => theme.colors.text.secondary};
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing.xs};
    transform: translateY(-50%);
  }

  .FileInput-input {
    padding-right: ${({ theme }) => theme.spacing.ml};
  }
`

interface IFileInput {
  path: string
  onClickOutside: () => void
  onToggle: (path: string, toggled: boolean) => void
}

export function FileInput({ onClickOutside, path, onToggle }: IFileInput) {
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{ [key: string]: any }>(defaultState)
  const [createFile, { loading }] = useCreateFile()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setForm(prevState => ({
      ...prevState,
      name: value,
    }))
  }

  async function handleCreateNewFile(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    onClickOutside()

    const nodePath = path ? `${path}/${name}.md` : `${name}.md`

    const nodePathArray = nodePath.split('/')

    nodePathArray.pop()

    onToggle(nodePathArray.join('/'), true)

    await createFile(nodePath)
  }

  return (
    <Style>
      <InlineInput
        isDisabled={loading}
        value={name}
        clickOutsideCallback={onClickOutside}
        handleOnChange={handleOnChange}
        onSubmit={handleCreateNewFile}
        inputAriaLabel="Input file name"
        formAriaLabel="File name form"
        type="text"
        className="FileInput-input"
      />
    </Style>
  )
}
