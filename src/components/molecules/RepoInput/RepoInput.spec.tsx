import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateRepo } from '../../../hooks'
import { resolvers, user } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { RepoInput } from './RepoInput'

jest.mock('../../../hooks/Repo/useCreateRepo')

afterEach(cleanup)

describe('RepoInput', () => {
  const alert = jest.fn()
  const id = -1

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
    ;(global as any).Math.round = () => id
  })

  it('should create a new repo when user submits form', async () => {
    const { login } = user
    const createNewRepo = jest.fn()
    ;(useCreateRepo as jest.Mock).mockImplementation(() => [
      createNewRepo,
      { loading: false },
    ])

    const newRepoName = 'MOCK_REPO_NAME'

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <RepoInput />
      </MockProvider>
    )

    const input = getByLabelText('Repo name')

    await fireEvent.change(input, {
      target: { value: newRepoName },
    })

    expect(input).toHaveAttribute('value', newRepoName)

    const form = getByLabelText('Repo name')

    await fireEvent.submit(form)

    expect(createNewRepo).toBeCalledWith({
      variables: { input: { name: newRepoName, private: false } },
      optimisticResponse: {
        __typename: 'Mutation',
        createRepo: {
          __typename: 'Repo',
          full_name: `${login}/Soft.${newRepoName}`,
          id,
          name: newRepoName,
          node_id: '',
          description: null,
          private: false,
        },
      },
    })
  })

  it('should display an error message and close the input if there was a problem', async () => {
    const createNewRepo = () => Promise.reject()
    ;(useCreateRepo as jest.Mock).mockImplementation(() => [
      createNewRepo,
      { loading: false },
    ])

    const newRepoName = 'MOCK_REPO_NAME'

    const { getByLabelText } = await render(
      <MockProvider>
        <RepoInput />
      </MockProvider>
    )

    const input = getByLabelText('Repo name')

    await fireEvent.change(input, {
      target: { value: newRepoName },
    })

    const form = getByLabelText('Repo name')

    await fireEvent.submit(form)

    expect(alert).toBeCalledWith(
      'There was an issue creating your repo, please try again'
    )
  })
})
