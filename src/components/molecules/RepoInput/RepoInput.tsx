import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { useClickOutside, useCreateRepo } from '../../../hooks'
import { styled } from '../../../theme'
import { Icon, Input } from '../../atoms'

const Style = styled.form<{ isPrivate: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};

  input {
    flex: 1;
    font-size: ${({ theme }) => theme.rhythm(0.6)};
    background-color: transparent;
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    min-width: 20px;
    padding: 0 ${({ theme }) => theme.spacing.xxs};
  }

  .RepoInput-icon {
    color: ${({ theme, isPrivate }) =>
      isPrivate ? theme.colors.accent : theme.colors.text.secondary};
  }
`

interface IRepoInput {
  setIsNewRepoOpen: Dispatch<SetStateAction<boolean>>
}

export function RepoInput({ setIsNewRepoOpen }: IRepoInput) {
  const inputRef = useRef<{ ref: HTMLInputElement } | null>(null)
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  const defaultState = { name: '', isPrivate: false }
  const [{ name, isPrivate }, setForm] = useState<{ [key: string]: any }>(
    defaultState
  )
  const [createNewRepo] = useCreateRepo()
  useClickOutside(() => setIsNewRepoOpen(false), wrapperRef)

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

  useLayoutEffect(() => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.ref.focus()
  }, [])

  return (
    <Style
      ref={wrapperRef}
      isPrivate={isPrivate}
      onSubmit={handleCreateNewRepo}
      aria-label={isPrivate ? 'Add a private new repo' : 'Add a new repo'}
    >
      <Icon
        onClick={handleOnClick}
        className="RepoInput-icon"
        size="xs"
        icon="product-hunt"
        prefix="fab"
        marginRight
        ariaLabel="Make this a public or private repo"
      />
      <Input
        ref={inputRef}
        value={name}
        onChange={handleOnChange}
        aria="Repo name"
        name="name"
      />
    </Style>
  )
}
