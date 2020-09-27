import React, { useState } from 'react'

import { useCreateFile } from '../../../hooks'
import { useMoveFile } from '../../../hooks/file/useMoveFile'
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
  path?: string | null
  onClickOutside: () => void
  onToggle: (path: string, toggled: boolean) => void
  action: 'create' | 'rename'
}

export function FileInput({
  onClickOutside,
  path,
  onToggle,
  action,
}: IFileInput) {
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{ [key: string]: any }>(defaultState)
  const [createFile, { loading }] = useCreateFile()
  const [moveFile] = useMoveFile()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setForm((prevState) => ({
      ...prevState,
      name: value,
    }))
  }

  async function handleCreateNewFile(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    onClickOutside()

    const nodePath = path ? `${path}/${name}.md` : `${name}.md`

    // Split path into parts
    const nodePathArray = nodePath.split('/')

    // Pop off the file so that we have the path of the folder
    nodePathArray.pop()

    // Toggle the folder open so we can see the new file
    onToggle(nodePathArray.join('/'), true)

    // Create the file at the full path
    try {
      await createFile(nodePath)
    } catch {
      alert('Could not create file. Please try again.')
    }
  }

  async function handleRenameFile(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    onClickOutside()

    if (!path) {
      throw new Error('No path selected')
    }

    // Split path into parts
    const currentPathArray = path.split('/')

    // Pop off the last node
    currentPathArray.pop()

    // If we're editing a top level node, we don't need the '/'
    const newPath =
      currentPathArray.length === 0
        ? `${name}.md`
        : `${currentPathArray}/${name}.md`

    try {
      await moveFile(newPath, path)
    } catch {
      alert('Could not rename file. Please try again.')
    }
  }

  let actionHandler: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>

  switch (action) {
    case 'create':
      actionHandler = handleCreateNewFile
      break
    case 'rename':
      actionHandler = handleRenameFile
      break
    default:
      throw new Error('Action not supported')
  }

  return (
    <Style>
      <InlineInput
        isDisabled={loading}
        value={name}
        clickOutsideCallback={onClickOutside}
        handleOnChange={handleOnChange}
        onSubmit={actionHandler}
        inputAriaLabel="Input file name"
        formAriaLabel="File name form"
        type="text"
        className="FileInput-input"
      />
    </Style>
  )
}
