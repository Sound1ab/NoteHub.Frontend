import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateRepo } from '../../../hooks'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { RepoInput } from './RepoInput'

jest.mock('../../../hooks/Repo/useCreateRepo')

afterEach(cleanup)

describe('RepoInput', () => {
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
  })

  it('should be able to be a private or public repo', async () => {
    const createNewRepo = jest.fn()
    ;(useCreateRepo as jest.Mock).mockImplementation(() => [createNewRepo])

    const { getByLabelText } = await render(
      <MockProvider>
        <RepoInput />
      </MockProvider>
    )

    expect(getByLabelText('Repo name')).toBeDefined()

    await fireEvent.click(getByLabelText('Make this a public or private repo'))

    expect(getByLabelText('Add a private new repo')).toBeDefined()
  })

  it('should create a new repo when user submits form', async () => {
    const createNewRepo = jest.fn()
    ;(useCreateRepo as jest.Mock).mockImplementation(() => [createNewRepo])

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

    expect(input).toHaveAttribute('value', newRepoName)

    const form = getByLabelText('Repo name')

    await fireEvent.submit(form)

    expect(createNewRepo).toBeCalledWith({
      variables: { input: { name: newRepoName, private: false } },
    })
  })

  it('should display an error message and close the input if there was a problem', async () => {
    const createNewRepo = () => Promise.reject()
    ;(useCreateRepo as jest.Mock).mockImplementation(() => [createNewRepo])

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
