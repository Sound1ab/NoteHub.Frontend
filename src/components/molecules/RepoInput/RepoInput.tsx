import React, {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { styled } from '../../../theme'
import { Icon, Input } from '../../atoms'
import { useCreateRepo } from '../../../hooks/Repo/useCreateRepo'
import { useStore } from '../../../hooks'
import { NewRepoContext } from '../../organisms'

const Style = styled.form<{ isPrivate: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: ${({theme}) => theme.spacing.xxs};

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

export function RepoInput() {
  const context = useContext(NewRepoContext)
  const inputRef = useRef<{ ref: HTMLInputElement }>(null)
  const wrapperRef = useRef<HTMLFormElement>(null)
  const defaultState = { name: '', isPrivate: false }
  const [{ name, isPrivate }, setForm] = useState<{ [key: string]: any }>(
    defaultState
  )
  const [
    {
      user: { username },
    },
  ] = useStore()
  const createNewRepo = useCreateRepo(username)

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
      context && context.setIsModalOpen(false)
    }
  }

  useLayoutEffect(() => {
    if (!inputRef || !inputRef.current) {
      return
    }
    inputRef.current.ref.focus()
  }, [])

  useLayoutEffect(() => {
    const handleClick = (e: any) => {
      if (wrapperRef && wrapperRef.current && wrapperRef.current.contains(e.target)) {
        return;
      }
      context && context.setIsModalOpen(false)
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [context]);

  return (
    <Style ref={wrapperRef} isPrivate={isPrivate} onSubmit={handleCreateNewRepo}>
      <Icon
        onClick={handleOnClick}
        className="RepoInput-icon"
        size="xs"
        icon="product-hunt"
        prefix="fab"
        marginRight
      />
      <Input
        ref={inputRef}
        value={name}
        onChange={handleOnChange}
        name="name"
      />
    </Style>
  )
}
