import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'

import { resolvers } from '../../../../../schema/mockResolvers'
import { process } from '../../../../../services/retext/process'
import { render, waitFor } from '../../../../../test-utils'
import { Retext_Settings } from '../../../../apollo/generated_components_typings'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { MarkdownEditor } from './MarkdownEditor'

describe('MarkdownEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;((process as unknown) as jest.Mock).mockReturnValue(
      Promise.resolve([
        {
          message: '`heelo` is misspelt',
          location: {
            start: {
              offset: 0,
            },
            end: {
              offset: 5,
            },
          },
          actual: 16,
        },
      ])
    )
  })

  it('should show markdown editor', async () => {
    const { getByLabelText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [
          () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        ],
      }
    )

    expect(getByLabelText('Markdown editor')).toBeInTheDocument()
  })

  it('should not show markdown editor if path is not a file', async () => {
    const { queryByLabelText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [() => localState.currentPathVar('MOCK_FOLDER_PATH')],
      }
    )

    expect(queryByLabelText('Markdown editor')).not.toBeInTheDocument()
  })

  it('should display the toast alert if updating file errors', async () => {
    const { getByText, getByRole } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        enableToast: true,
        resolvers: {
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            updateFile: () => {
              throw new Error('mock error')
            },
          }),
        },
        localState: [
          () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        ],
      }
    )

    await act(async () => {
      userEvent.type(getByRole('textbox'), '1')
    })

    await waitFor(() =>
      expect(
        getByText('There was an issue updating your document. mock error')
      ).toBeInTheDocument()
    )
  })

  it('should underline text if file contains messages', async () => {
    const { getByText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [
          () => localState.currentPathVar('MOCK_FILE_PATH_4.md'),
          () =>
            localState.retextSettingsVar({
              ...localState.retextSettingsVar(),
              [Retext_Settings.Spell]: true,
            }),
        ],
      }
    )

    await waitFor(() => {
      expect(getByText('heelo')).toHaveAttribute(
        'style',
        'text-decoration: underline; text-decoration-color: var(--accent-primary); text-decoration-style: wavy;'
      )
    })
  })

  it('should display message widget when marker is clicked', async () => {
    const { getByText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [
          () => localState.currentPathVar('MOCK_FILE_PATH_4.md'),
          () =>
            localState.retextSettingsVar({
              ...localState.retextSettingsVar(),
              [Retext_Settings.Spell]: true,
            }),
        ],
      }
    )

    await userEvent.click(getByText('heelo'))

    await waitFor(() =>
      expect(getByText('`heelo` is misspelt')).toBeInTheDocument()
    )
  })
})
