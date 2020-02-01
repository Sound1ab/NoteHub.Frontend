import React, { useState } from 'react'

import {
  REPO_NAMESPACE,
  useCommand,
  useCreateRepo,
  useReadGithubUser,
} from '../../../hooks'
import { InlineInput } from '../InlineInput/InlineInput'

export function RepoInput() {
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{ [key: string]: any }>(defaultState)
  const [createNewRepo, { loading }] = useCreateRepo()
  const { handleSetIsNewRepoOpen } = useCommand()
  const user = useReadGithubUser()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setForm(prevState => ({
      ...prevState,
      name: value,
    }))
  }

  async function handleCreateNewRepo(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await createNewRepo({
        variables: {
          input: {
            name,
            private: false,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createRepo: {
            __typename: 'Repo',
            full_name: `${user?.login}/${REPO_NAMESPACE}.${name}`,
            id: Math.round(Math.random() * -1000000),
            name,
            node_id: '',
            description: null,
            private: false,
          },
        },
      })
    } catch {
      alert('There was an issue creating your repo, please try again')
    } finally {
      setForm(defaultState)
      handleSetIsNewRepoOpen(false)
    }
  }

  return (
    <InlineInput
      isDisabled={loading}
      value={name}
      clickOutsideCallback={() => handleSetIsNewRepoOpen(false)}
      handleOnChange={handleOnChange}
      onSubmit={handleCreateNewRepo}
      formAriaLabel="Add a new repo"
      inputAriaLabel="Repo name"
      type="text"
    />
  )
}
