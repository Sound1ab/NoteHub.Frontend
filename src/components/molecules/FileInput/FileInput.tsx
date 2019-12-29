import React, { useState } from 'react'

import { Command } from '../../../Context'
import {
  useCreateFile,
  useNonNullableContext,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '../../../hooks'
import { InlineInput } from '../InlineInput/InlineInput'

export function FileInput() {
  const { handleSetIsNewFileOpen } = useNonNullableContext(Command)
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{ [key: string]: any }>(defaultState)
  const [createNewFile] = useCreateFile()
  const user = useReadGithubUser()
  const { currentRepoName } = useReadCurrentRepoName()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setForm(prevState => ({
      ...prevState,
      name: value,
    }))
  }

  async function handleCreateNewFile(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user || !currentRepoName) {
      alert('Error')
      return
    }
    try {
      await createNewFile({
        variables: {
          input: {
            content: `# ${name}`,
            filename: `${name}.md`,
            repo: currentRepoName,
            username: user.login,
          },
        },
      })
    } catch {
      alert('There was an issue creating your file, please try again')
    } finally {
      setForm(defaultState)
      handleSetIsNewFileOpen()
    }
  }

  return (
    <InlineInput
      value={name}
      clickOutsideCallback={handleSetIsNewFileOpen}
      handleOnChange={handleOnChange}
      onSubmit={handleCreateNewFile}
      inputAriaLabel="Input file name"
      formAriaLabel="File name form"
    />
  )
}
