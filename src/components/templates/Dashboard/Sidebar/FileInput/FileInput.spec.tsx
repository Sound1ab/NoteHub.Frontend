import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile } from '../../../../../hooks'
import { useMoveFile } from '../../../../../hooks/file/useMoveFile'
import { folderNode } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { FileInput } from './FileInput'

jest.mock('../../../../../hooks/file/useCreateFile')
jest.mock('../../../../../hooks/file/useMoveFile')

afterEach(cleanup)

describe('FileInput', () => {
  const alert = jest.fn()
  const createNewFile = jest.fn()
  const moveFile = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])
    ;(useMoveFile as jest.Mock).mockImplementation(() => [
      moveFile,
      { loading: false },
    ])
    global.alert = alert
  })

  const newFileName = 'Mock file Na/me'
  const path = folderNode.path

  describe('when creating a file', () => {
    it('should call createNewfile with node path', async () => {
      const { getByLabelText } = await render(
        <FileInput path={path} onClickOutside={jest.fn()} action="create" />
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: newFileName },
      })

      expect(input).toHaveAttribute('value', newFileName)

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(createNewFile).toBeCalledWith(`${path}/${newFileName}.md`)
    })

    it('should display error message if create file fails', async () => {
      ;(useCreateFile as jest.Mock).mockImplementation(() => [
        async () => Promise.reject(),
        { loading: false },
      ])

      const alert = jest.fn()
      global.alert = alert

      const { getByLabelText } = await render(
        <FileInput path={path} onClickOutside={jest.fn()} action="create" />
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: newFileName },
      })

      expect(input).toHaveAttribute('value', newFileName)

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(alert).toBeCalledWith('Could not create file. Please try again.')
    })
  })

  describe('when renaming a file', () => {
    it('should call moveFile with new node path and old node path', async () => {
      const { getByLabelText } = await render(
        <FileInput
          path="MOCK_FOLDER_PATH/MOCK_FILE_PATH.md"
          onClickOutside={jest.fn()}
          action="rename"
        />
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'NEW_MOCK_FILE_PATH' },
      })

      expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(moveFile).toBeCalledWith(
        'MOCK_FOLDER_PATH/NEW_MOCK_FILE_PATH.md',
        'MOCK_FOLDER_PATH/MOCK_FILE_PATH.md'
      )
    })

    it('should display error message if create file fails', async () => {
      ;(useMoveFile as jest.Mock).mockImplementation(() => [
        async () => Promise.reject(),
        { loading: false },
      ])

      const alert = jest.fn()
      global.alert = alert

      const { getByLabelText } = await render(
        <FileInput
          path="MOCK_FOLDER_PATH/MOCK_FILE_PATH.md"
          onClickOutside={jest.fn()}
          action="rename"
        />
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'NEW_MOCK_FILE_PATH' },
      })

      expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(alert).toBeCalledWith('Could not rename file. Please try again.')
    })
  })
})
