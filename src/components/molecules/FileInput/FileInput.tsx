import React, { useState } from 'react'

import { useCreateFile } from '../../../hooks'
import { InlineInput } from '../InlineInput/InlineInput'

interface IFileInput {
  path: string
  onClickOutside: () => void
}

export function FileInput({ onClickOutside, path }: IFileInput) {
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
    await createFile(path ? `${path}/${name}.md` : `${name}.md`)
  }

  return (
    <InlineInput
      isDisabled={loading}
      value={name}
      clickOutsideCallback={onClickOutside}
      handleOnChange={handleOnChange}
      onSubmit={handleCreateNewFile}
      inputAriaLabel="Input file name"
      formAriaLabel="File name form"
      type="text"
    />
  )
}
