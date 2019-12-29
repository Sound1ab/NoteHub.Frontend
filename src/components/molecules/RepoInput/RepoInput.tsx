import React, { Dispatch, SetStateAction, useState } from 'react'

import { useCreateRepo } from '../../../hooks'
import { styled } from '../../../theme'
import { Icon } from '../../atoms'
import { InlineInput } from '../InlineInput/InlineInput'

const StyleIcon = styled(Icon)<{ isPrivate: boolean }>`
  color: ${({ theme, isPrivate }) =>
    isPrivate ? theme.colors.accent : theme.colors.text.secondary};
`

interface IRepoInput {
  setIsNewRepoOpen: Dispatch<SetStateAction<boolean>>
}

export function RepoInput({ setIsNewRepoOpen }: IRepoInput) {
  const defaultState = { name: '', isPrivate: false }
  const [{ name, isPrivate }, setForm] = useState<{ [key: string]: any }>(
    defaultState
  )
  const [createNewRepo] = useCreateRepo()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setForm(prevState => ({
      ...prevState,
      name: value,
    }))
  }

  function handleOnClick() {
    setForm(prevState => ({
      ...prevState,
      isPrivate: !prevState.isPrivate,
    }))
  }

  async function handleCreateNewRepo(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await createNewRepo({
        variables: {
          input: {
            name,
            private: isPrivate,
          },
        },
      })
    } catch {
      alert('There was an issue creating your repo, please try again')
    } finally {
      setForm(defaultState)
      setIsNewRepoOpen(false)
    }
  }

  return (
    <InlineInput
      value={name}
      clickOutsideCallback={() => setIsNewRepoOpen(false)}
      handleOnChange={handleOnChange}
      onSubmit={handleCreateNewRepo}
      formAriaLabel={isPrivate ? 'Add a private new repo' : 'Add a new repo'}
      inputAriaLabel="Repo name"
      icon={
        <StyleIcon
          onClick={handleOnClick}
          className="RepoInput-icon"
          size="xs"
          icon="product-hunt"
          prefix="fab"
          marginRight
          ariaLabel="Make this a public or private repo"
          isPrivate={isPrivate}
        />
      }
    />
  )
}
