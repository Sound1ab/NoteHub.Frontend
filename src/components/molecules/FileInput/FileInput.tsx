import React, { useState } from 'react'

import {
  useCommand,
  useCreateFile,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '../../../hooks'
import { InlineInput } from '../InlineInput/InlineInput'

export function FileInput() {
  const { handleSetIsNewFileOpen } = useCommand()
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{ [key: string]: any }>(defaultState)
  const [createNewFile, { loading }] = useCreateFile()
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

    const filename = name.toLowerCase().replace(/ /gi, '-')

    try {
      await createNewFile({
        variables: {
          input: {
            content: `# ${name}`,
            filename: `${filename}.md`,
            repo: currentRepoName,
            username: user.login,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createFile: {
            __typename: 'File',
            filename: `${filename}.md`,
            path: '',
            content: `# ${name}`,
            excerpt: null,
            sha: 'optimistic',
            _links: {
              __typename: 'Links',
              html: '',
            },
            repo: '',
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
      isDisabled={loading}
      value={name}
      clickOutsideCallback={handleSetIsNewFileOpen}
      handleOnChange={handleOnChange}
      onSubmit={handleCreateNewFile}
      inputAriaLabel="Input file name"
      formAriaLabel="File name form"
    />
  )
}
