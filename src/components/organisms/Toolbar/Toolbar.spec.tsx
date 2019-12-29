import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { useNonNullableContext } from '../../../hooks/'
import { files, repos, resolvers } from '../../../schema/mockResolvers'
import { act, cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Toolbar } from './Toolbar'

afterEach(cleanup)

jest.mock('../../../hooks/utils/useNonNullableContext')

describe('Toolbar', () => {
  const handleDeleteFile = jest.fn()
  const handleImageUpload = jest.fn()
  const handleSetEdit = jest.fn()
  const handleSetIsNewFileOpen = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useNonNullableContext as jest.Mock).mockReturnValue({
      handleSetIsNewFileOpen,
      handleSetEdit,
      handleImageUpload,
      handleDeleteFile,
    })
  })

  it('should disable create file button if there is no repo selected and open file modal when create file button is clicked', async () => {
    const { getByLabelText, queryByTitle, rerender } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Create a new file'))

    expect(queryByTitle('Create new File')).toBeNull()

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Toolbar />
      </MockProvider>
    )

    await act(() => wait(0))

    await fireEvent.click(getByLabelText('Create a new file'))

    expect(queryByTitle('Create new File')).toBeDefined()
  })

  it('should disabled delete file button if there is no repo or file selected and delete file if delete file button is clicked', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText, rerender } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Delete the selected file'))

    expect(handleDeleteFile).not.toBeCalled()

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: null }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Delete the selected file'))

    expect(handleDeleteFile).not.toBeCalled()

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Delete the selected file'))

    expect(handleDeleteFile).toBeCalled()
  })

  it('should call handleSetEdit', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('View file in preview'))

    expect(handleSetEdit).toBeCalled()
  })

  it('should toggle set edit button state', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText, rerender } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentRepoName: name,
          currentFileName: filename,
          isEdit: true,
        }}
      >
        <Toolbar />
      </MockProvider>
    )

    expect(getByLabelText('View file in preview')).toBeDefined()

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentRepoName: name,
          currentFileName: filename,
          isEdit: false,
        }}
      >
        <Toolbar />
      </MockProvider>
    )

    expect(getByLabelText('View file in markdown')).toBeDefined()
  })

  it('should call handleImageUpload', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Upload an image'))

    expect(handleImageUpload).toBeCalled()
  })

  it('should call handleSetIsNewFileOpen when Create a new file button is clicked', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Create a new file'))

    expect(handleSetIsNewFileOpen).toBeCalled()
  })
})
