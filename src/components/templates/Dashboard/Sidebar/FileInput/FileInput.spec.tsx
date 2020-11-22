import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile, useFileTree } from '../../../../../hooks'
import { useMoveFile } from '../../../../../hooks/file/useMoveFile'
import { files } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render, waitFor } from '../../../../../test-utils'
import { createNodes } from '../../../../../utils'
import { Node_Type } from '../../../../apollo'
import { FileInput } from './FileInput'

jest.mock('../../../../../hooks/file/useCreateFile')
jest.mock('../../../../../hooks/file/useMoveFile')
jest.mock('../../../../../hooks/utils/useFileTree')

afterEach(cleanup)

describe('FileInput', () => {
  const alert = jest.fn()
  const createNewFile = jest.fn()
  const moveFile = jest.fn()
  const onToggle = jest.fn()

  const nodes = createNodes(files, new Set())

  const [folderNode] = nodes.filter((node) => node.type === Node_Type.Folder)

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
    ;(useFileTree as jest.Mock).mockImplementation(() => ({
      onToggle,
    }))
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

    it('should call onToggle with folder paths', async () => {
      const nestedFilePath = 'mock_folder_1/mock_folder_2/mock_file'

      const { getByLabelText } = await render(
        <FileInput path={path} onClickOutside={jest.fn()} action="create" />
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: nestedFilePath },
      })

      expect(input).toHaveAttribute('value', nestedFilePath)

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(onToggle).toBeCalledWith(`${path}/mock_folder_1`, true)
      expect(onToggle).toBeCalledWith(
        `${path}/mock_folder_1/mock_folder_2`,
        true
      )
    })

    it('should display the toast alert if create file errors', async () => {
      ;(useCreateFile as jest.Mock).mockImplementation(() => [
        async () => Promise.reject('mock error'),
        { loading: false },
      ])

      const { getByLabelText, getByText } = await render(
        <FileInput path={path} onClickOutside={jest.fn()} action="create" />,
        { enableToast: true }
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: newFileName },
      })

      expect(input).toHaveAttribute('value', newFileName)

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      await waitFor(() =>
        expect(
          getByText('There was an issue creating your file. mock error')
        ).toBeInTheDocument()
      )
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

    it('should display error message if rename file fails', async () => {
      ;(useMoveFile as jest.Mock).mockImplementation(() => [
        async () => Promise.reject('mock error'),
        { loading: false },
      ])

      const { getByLabelText, getByText } = await render(
        <FileInput
          path="MOCK_FOLDER_PATH/MOCK_FILE_PATH.md"
          onClickOutside={jest.fn()}
          action="rename"
        />,
        { enableToast: true }
      )

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'NEW_MOCK_FILE_PATH' },
      })

      expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      await waitFor(() =>
        expect(
          getByText('There was an issue renaming your file. mock error')
        ).toBeInTheDocument()
      )
    })
  })
})
