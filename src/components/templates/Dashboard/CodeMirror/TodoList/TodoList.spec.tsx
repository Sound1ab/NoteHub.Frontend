import React from 'react'

import { fireEvent, render } from '../../../../../test-utils'
import { TodoList } from './TodoList'

jest.mock('../../../../../utils/getUuid', () => ({
  getUuid: () => 'MOCK_UUID',
}))

const localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', { value: localStorage })

describe('TodoList', () => {
  const storeKey = 'mockKey'

  it('should add a todo', async () => {
    const { getByLabelText } = await render(<TodoList storeKey={storeKey} />)

    await fireEvent.change(getByLabelText('add todo'), {
      target: { value: 'new todo' },
    })

    await fireEvent.submit(getByLabelText('submit todo'))

    expect(getByLabelText('todo')).toHaveValue('new todo')
  })

  it('should edit a todo', async () => {
    const { getByLabelText } = await render(<TodoList storeKey={storeKey} />)

    await fireEvent.change(getByLabelText('add todo'), {
      target: { value: 'new todo' },
    })

    await fireEvent.submit(getByLabelText('submit todo'))

    await fireEvent.change(getByLabelText('todo'), {
      target: { value: 'new todo edited' },
    })

    expect(getByLabelText('todo')).toHaveValue('new todo edited')
  })

  it('should remove a todo', async () => {
    const { getByLabelText, getByTitle } = await render(
      <TodoList storeKey={storeKey} />
    )

    await fireEvent.change(getByLabelText('add todo'), {
      target: { value: 'new todo' },
    })

    await fireEvent.submit(getByLabelText('submit todo'))

    const todo = getByLabelText('todo')

    expect(todo).toHaveValue('new todo')

    await fireEvent.click(getByTitle('remove todo'))

    expect(todo).not.toBeInTheDocument()
  })

  it('should mark a todo as done', async () => {
    const { getByLabelText, getByRole } = await render(
      <TodoList storeKey={storeKey} />
    )

    await fireEvent.change(getByLabelText('add todo'), {
      target: { value: 'new todo' },
    })

    await fireEvent.submit(getByLabelText('submit todo'))

    await fireEvent.click(getByRole('checkbox'))

    expect(getByLabelText('todo')).toHaveStyleRule(
      'text-decoration',
      'line-through'
    )
  })
})
