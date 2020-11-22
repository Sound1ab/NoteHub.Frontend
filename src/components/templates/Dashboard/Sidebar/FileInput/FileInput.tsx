import React, { useEffect, useState } from 'react'

import { useCreateFile, useFileTree } from '../../../../../hooks'
import { useMoveFile } from '../../../../../hooks/file/useMoveFile'
import styled from 'styled-components'
import { ITreeNode } from '../../../../../types'
import { ErrorToast, Input } from '../../../../atoms'

interface IFileInput {
  node?: ITreeNode | null
  onClickOutside: () => void
  action: 'create' | 'rename'
  startingText?: string
}

export function FileInput({
  onClickOutside,
  node,
  action,
  startingText,
}: IFileInput) {
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{
    [key: string]: string
  }>(defaultState)
  const [createFile, { loading }] = useCreateFile()
  const [moveFile] = useMoveFile()
  const { onToggle, onClick } = useFileTree()

  useEffect(() => {
    if (!startingText) {
      return
    }

    setForm((prevState) => ({
      ...prevState,
      name: startingText,
    }))
  }, [startingText])

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

    const nodePath = node?.path ? `${node.path}/${name}.md` : `${name}.md`

    // Split path into parts
    const nodePathArray = nodePath.split('/')

    // Pop off the file so that we have the path of the folder
    nodePathArray.pop()

    // Toggle all the folders in the path open so we can see the new file
    for (let i = nodePathArray.length - 1; i >= 0; i--) {
      onToggle(nodePathArray.join('/'), true)
      nodePathArray.pop()
    }

    // Create the file at the full path
    try {
      await createFile(nodePath)
    } catch (error) {
      ErrorToast(`There was an issue creating your file. ${error}`)
    }
  }

  async function handleRenameFile(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    onClickOutside()

    if (!node?.path) {
      throw new Error('No path selected')
    }

    // Split path into parts
    const currentPathArray = node.path.split('/')

    // Pop off the last node
    currentPathArray.pop()

    // If we're editing a top level node, we don't need the '/'
    const newPath =
      currentPathArray.length === 0
        ? `${name}.md`
        : `${currentPathArray}/${name}.md`

    const newPathArray = newPath.split('/')

    // Toggle all the folders in the path open so we can see the new file
    for (let i = newPathArray.length - 1; i >= 0; i--) {
      onToggle(newPathArray.join('/'), true)
      newPathArray.pop()
    }

    try {
      const file = await moveFile(newPath, node)

      if (!file) {
        return
      }

      onClick(file.path)
    } catch (error) {
      ErrorToast(`There was an issue renaming your file. ${error}`)
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
    <Wrapper>
      <StyledFileInput
        isDisabled={loading}
        value={name}
        clickOutsideCallback={onClickOutside}
        handleOnChange={handleOnChange}
        onSubmit={actionHandler}
        inputAriaLabel="Input file name"
        formAriaLabel="File name form"
        type="text"
        autoFocus
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  position: relative;

  &:after {
    content: '.md';
    color: ${({ theme }) => theme.colors.text.secondary};
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing.s};
    transform: translateY(-50%);
  }
`

const StyledFileInput = styled(Input)`
  padding-right: ${({ theme }) => theme.spacing.ml};
`
