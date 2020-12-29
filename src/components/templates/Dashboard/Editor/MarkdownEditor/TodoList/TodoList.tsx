import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { getUuid } from '../../../../../../utils/getUuid'
import { Checkbox } from '../../../../../atoms/Checkbox/Checkbox'
import { Close } from '../../../../../atoms/Close/Close'
import { Input } from '../../../../../atoms/Input/Input'

interface ITodo {
  id: string
  description: string
  isDone: boolean
}

interface ITodoList {
  storeKey: string
}

export function TodoList({ storeKey }: ITodoList) {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [newTodoValue, setNewTodoValue] = useState('')
  const hasLoaded = useRef(false)

  useEffect(() => {
    if (!hasLoaded.current) return

    localStorage.setItem(storeKey, JSON.stringify(todos))
  }, [storeKey, todos])

  useEffect(() => {
    if (hasLoaded.current) return

    const savedTodos = localStorage.getItem(storeKey)

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    hasLoaded.current = true
  }, [storeKey])

  function handleCheckbox(id: string) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  function handleNewTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    setNewTodoValue(value)
  }

  function handleTodoSubmit() {
    setTodos((todos) => [
      ...todos,
      { id: getUuid(), description: newTodoValue, isDone: false },
    ])
  }

  function handleEditTodoChange(id: string, value: string) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, description: value } : todo
      )
    )
  }

  function removeTodo(id: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }

  return (
    <Wrapper>
      {todos.map(({ id, description, isDone }) => (
        <Todo
          icon={
            <Checkbox
              type="checkbox"
              checked={isDone}
              readOnly={true}
              id={id}
              onChange={() => handleCheckbox(id)}
            />
          }
          iconAfter={
            <Close
              icon="times"
              size="1x"
              onClick={() => removeTodo(id)}
              title="remove todo"
            />
          }
          key={id}
          value={description}
          handleOnChange={(e) => handleEditTodoChange(id, e.target.value)}
          inputAriaLabel="todo"
          type="text"
          isDone={isDone}
        />
      ))}
      <Input
        value={newTodoValue}
        handleOnChange={handleNewTodoChange}
        onSubmit={handleTodoSubmit}
        inputAriaLabel="add todo"
        formAriaLabel="submit todo"
        type="text"
        placeholder="New todo"
      />
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  position: relative;
  color: var(--text-primary);
  margin: 0;

  form + form {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }

  form {
    display: flex;
    align-items: center;
  }
`

const Todo = styled(Input)<{ isDone: boolean }>`
   {
    ${({ isDone }) =>
      isDone &&
      css`
        text-decoration: line-through;
      `}
  }
`
