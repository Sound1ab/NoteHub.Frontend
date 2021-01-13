import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'

import * as recoil from '../../../hooks/recoil/useActivePath'
import { files } from '../../../schema/mockData'
import { resolvers } from '../../../schema/mockResolvers'
import { process } from '../../../services/retext/process'
import { fireEvent, render, waitFor } from '../../../test-utils'
import { createNodes } from '../../../utils/createNodes'
import { getMockNodes } from '../../../utils/testing/getMockNodes'
import { spyOn } from '../../../utils/testing/spyOn'
import {
  clickDropdownItem,
  openDropdown,
  typeInInputAndSubmit,
} from '../../../utils/testing/userActions'
import {
  Node_Type,
  Retext_Settings,
} from '../../apollo/generated_components_typings'
import { localState } from '../../providers/ApolloProvider/cache'
import Dashboard from './Dashboard'

jest.setTimeout(10000)

jest.mock('../../../utils/debounce')
jest.mock('../../../utils/scrollIntoView')
jest.mock('../../../hooks/image/useCreateSignedUrl')
jest.mock('react-use-upload', () => ({
  useUpload: (file: File | null, { getUrl }: { getUrl: () => void }) => {
    getUrl()

    return file
      ? {
          progress: 100,
          done: true,
        }
      : {
          progress: 0,
          done: false,
        }
  },
}))

describe('Dashboard', () => {
  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

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

  xit('should add folder and file', async () => {
    const { getByLabelText } = await render(<Dashboard />)

    await openDropdown('MOCK_FOLDER_PATH')

    await clickDropdownItem('Create file')

    await typeInInputAndSubmit(
      'Input file name',
      'File name form',
      'NEW_MOCK_FILE_NAME'
    )

    // const input = getByLabelText('Input file name')

    // await userEvent.type(input, 'NEW_MOCK_FILE_NAME')

    // const form = getByLabelText('File name form')

    // await fireEvent.submit(form)
    //
    // expect(getByLabelText('NEW_MOCK_FILE_NAME.md actions')).toBeInTheDocument()
  })

  // it.skip('should display an error message and close the file input if there was a problem', async () => {})

  // it.skip('should delete file if repo and file is selected', async () => {})

  xit('should insert uploaded image at cursor position', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByLabelText, getByText } = await render(<Dashboard />)

    await fireEvent.contextMenu(getByLabelText('Markdown editor'))

    await fireEvent.click(getByLabelText('Image'))

    const imageFilename = 'chucknorris.png'

    const file = new File(['(⌐□_□)'], imageFilename, {
      type: 'image/png',
    })

    await fireEvent.change(getByLabelText('Upload file'), {
      target: { files: [file] },
    })

    await waitFor(
      () => expect(getByText('MOCK_IMAGE_PATH')).toBeInTheDocument(),
      { timeout: 7000 }
    )
  })

  it.skip('should show alert if deleting a file errors', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByLabelText, getByText } = await render(<Dashboard />, {
      enableToast: true,
      resolvers: {
        ...resolvers,
        Mutation: () => ({
          ...resolvers.Mutation(),
          deleteFile: (): File => {
            throw new Error('mock error')
          },
        }),
      },
    })

    // Open folder
    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    // Open dropdown
    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    // Delete file
    await fireEvent.click(getByLabelText('Delete file'))

    await waitFor(() =>
      expect(
        getByText(
          'There was an issue deleting your file. Error: Delete file: no file returned'
        )
      ).toBeInTheDocument()
    )
  })

  it.skip('should show mdx preview when preview is toggled', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByTitle, container } = await render(<Dashboard />)

    await fireEvent.click(getByTitle('Toggle side by side'))

    const heading = container.querySelector('h1')

    expect(heading).toContainHTML('<h1>MOCK_CONTENT</h1>')
  })

  xit('should add tabs when files are selected in the sidebar and close them', async () => {
    const { getByText, getByTitle } = await render(<Dashboard />)

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    await act(async () => {
      await userEvent.click(getByText('MOCK_FOLDER_PATH'))
    })

    await act(async () => {
      await userEvent.click(getByText('MOCK_FILE_PATH_1.md'))
    })

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')
    const tabTwo = getByTitle('MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md')

    expect(tabOne).toBeInTheDocument()

    expect(tabTwo).toBeInTheDocument()

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await userEvent.click(tabOne.querySelector('svg')!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await userEvent.click(tabTwo.querySelector('svg')!)
    })

    expect(tabOne).not.toBeInTheDocument()

    expect(tabTwo).not.toBeInTheDocument()
  })

  xit('should remove tab when file is deleted from the sidebar', async () => {
    const { getByLabelText, getByText, getByTitle } = await render(
      <Dashboard />
    )

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')

    // open file menu
    await userEvent.click(getByLabelText('MOCK_FILE_PATH_3.md actions'))

    await userEvent.click(getByLabelText('Delete'))

    expect(tabOne).not.toBeInTheDocument()
  })

  xit('should change name of tab when file is renamed from the sidebar', async () => {
    const { getByLabelText, getByText, getByTitle } = await render(
      <Dashboard />
    )

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')

    expect(tabOne).toBeInTheDocument()

    // open file menu
    await userEvent.click(getByLabelText('MOCK_FILE_PATH_3.md actions'))

    await userEvent.click(getByLabelText('Rename'))

    // Insert file name into input and submit
    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: 'NEW_MOCK_FILE_PATH' },
    })

    expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(tabOne).not.toBeInTheDocument()

    expect(getByTitle('NEW_MOCK_FILE_PATH.md')).toBeInTheDocument()
  })
})

// beforeEach(() => {
//   jest.clearAllMocks()
//   ;((process as unknown) as jest.Mock).mockReturnValue(
//     Promise.resolve([
//       {
//         message: '`heelo` is misspelt',
//         location: {
//           start: {
//             offset: 0,
//           },
//           end: {
//             offset: 5,
//           },
//         },
//         actual: 16,
//       },
//     ])
//   )
// })
//
// const { fileNode } = getMockNodes()
//
// it('should show markdown editor', async () => {
//   const { getByLabelText } = await render(<MarkdownEditor />)
//
//   expect(getByLabelText('Markdown editor')).toBeInTheDocument()
// })
//
// it('should not show markdown editor if path is not a file', async () => {
//   spyOn(recoil, 'useActivePath', () => [fileNode.path, jest.fn()])
//
//   const { queryByLabelText } = await render(<MarkdownEditor />)
//
//   expect(queryByLabelText('Markdown editor')).not.toBeInTheDocument()
// })
//
// it('should display the toast alert if updating file errors', async () => {
//   localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md')
//
//   const { getByText, getByRole } = await render(
//     <MarkdownEditor targetRef={createRef()} />,
//     {
//       enableToast: true,
//       resolvers: {
//         ...resolvers,
//         Mutation: () => ({
//           ...resolvers.Mutation(),
//           updateFile: () => {
//             throw new Error('mock error')
//           },
//         }),
//       },
//     }
//   )
//
//   await act(async () => {
//     userEvent.type(getByRole('textbox'), '1')
//   })
//
//   await waitFor(() =>
//     expect(
//       getByText('There was an issue updating your document. mock error')
//     ).toBeInTheDocument()
//   )
// })
//
// it('should underline text if file contains messages', async () => {
//   localState.currentPathVar('MOCK_FILE_PATH_4.md')
//   localState.retextSettingsVar({
//     ...localState.retextSettingsVar(),
//     [Retext_Settings.Spell]: true,
//   })
//
//   const { getByText } = await render(
//     <MarkdownEditor targetRef={createRef()} />
//   )
//
//   await waitFor(() => {
//     expect(getByText('heelo')).toHaveAttribute(
//       'style',
//       'text-decoration: underline; text-decoration-color: var(--accent-primary); text-decoration-style: wavy;'
//     )
//   })
// })
//
// it('should display message widget when marker is clicked', async () => {
//   localState.currentPathVar('MOCK_FILE_PATH_4.md')
//   localState.retextSettingsVar({
//     ...localState.retextSettingsVar(),
//     [Retext_Settings.Spell]: true,
//   })
//
//   const { getByText } = await render(
//     <MarkdownEditor targetRef={createRef()} />
//   )
//
//   await userEvent.click(getByText('heelo'))
//
//   await waitFor(() =>
//     expect(getByText('`heelo` is misspelt')).toBeInTheDocument()
//   )
// })
