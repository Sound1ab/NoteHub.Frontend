import path from 'path'

import { act, screen } from '@testing-library/react'
import React from 'react'

import {
  fireEvent,
  nockBack,
  renderWithNockBack,
  wait,
  waitFor,
} from '../../../test-utils'
import {
  clickDropdownItem,
  clickNode,
  clickProfile,
  closeTab,
  openDropdown,
  typeInInputAndSubmit,
  typeInTextArea,
} from '../../../utils/testing/userActions'
import Dashboard from './Dashboard'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const FDBFactory = require('fake-indexeddb/lib/FDBFactory')

jest.mock('../../../hooks/recoil/useRepo')
jest.unmock('../../../hooks/fs/useFs')
jest.unmock('../../../hooks/git/useGit')

jest.setTimeout(10000)

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    globalThis.indexedDB = new FDBFactory()
  })

  beforeAll(() => {
    nockBack.fixtures = path.join(__dirname, '__nockbacks__')
    nockBack.setMode('record')
  })

  it('should show sidebar, toolbar and editor', async () => {
    const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

    await expect(
      screen.findByText('levelOneFileOne.md')
    ).resolves.toBeInTheDocument()
    await expect(screen.findByAltText('avatar')).resolves.toBeInTheDocument()

    nockDone()
  })

  it('should open file content into editor', async () => {
    const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

    await act(async () => {
      await clickNode('levelOneFileOne.md')
      await wait(200)
    })

    await expect(
      screen.findByText('Some mock content')
    ).resolves.toBeInTheDocument()

    nockDone()
  })

  describe('toolbar', () => {
    // TODO: Add tests related to profile dropdown menu

    it('should remove tab when file is deleted from the sidebar', async () => {
      const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

      await act(async () => {
        await clickNode('levelOneFileOne.md')
        await wait(500)
      })

      const tabOne = await screen.findByTitle('levelOneFileOne.md')

      await openDropdown('levelOneFileOne.md')

      await act(async () => {
        await clickDropdownItem({ item: 'Delete' })
        await wait(200)
      })

      expect(tabOne).not.toBeInTheDocument()

      await wait(1000)

      nockDone()
    })

    it('should add tabs when files are selected in the sidebar and close them', async () => {
      const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

      await act(async () => {
        await clickNode('levelOneFileOne.md')
        await wait(200)
      })

      const tabOne = await screen.findByTitle('levelOneFileOne.md')

      expect(tabOne).toBeInTheDocument()

      await act(async () => {
        await closeTab(tabOne)
        await wait(200)
      })

      expect(tabOne).not.toBeInTheDocument()

      nockDone()
    })

    it('should change name of tab when file is renamed from the sidebar', async () => {
      const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

      await act(async () => {
        await clickNode('levelOneFileOne.md')
        await wait(200)
      })

      const tabOne = await screen.findByTitle('levelOneFileOne.md')

      await openDropdown('levelOneFileOne.md')

      await clickDropdownItem({ item: 'Rename' })

      await act(async () => {
        await typeInInputAndSubmit(
          'Input file name',
          'File name form',
          'levelOneFileOneRename'
        )
        await wait(200)
      })

      expect(tabOne).not.toBeInTheDocument()

      expect(screen.getByTitle('levelOneFileOneRename.md')).toBeInTheDocument()

      nockDone()
    })
  })

  describe('editor', () => {
    xit('should insert uploaded image at cursor position', async () => {
      const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

      await fireEvent.contextMenu(screen.getByLabelText('Markdown editor'))

      await fireEvent.click(screen.getByLabelText('Image'))

      const imageFilename = 'chucknorris.png'

      const file = new File(['(⌐□_□)'], imageFilename, {
        type: 'image/png',
      })

      await fireEvent.change(screen.getByLabelText('Upload file'), {
        target: { files: [file] },
      })

      await waitFor(
        () => expect(screen.getByText('MOCK_IMAGE_PATH')).toBeInTheDocument(),
        { timeout: 7000 }
      )

      nockDone()
    })

    it('should spell check text', async () => {
      const { nockDone } = await renderWithNockBack(<Dashboard />, 'clone.json')

      await clickProfile({ shouldWait: 500 })

      await clickDropdownItem({ item: 'Spelling', shouldWait: 200 })

      await typeInTextArea({
        text: 'some text wigh a spelling error',
        shouldWait: 1000,
      })

      await expect(screen.findByText('wigh')).resolves.toHaveAttribute(
        'style',
        'text-decoration: underline; text-decoration-color: var(--accent-primary); text-decoration-style: wavy;'
      )

      nockDone()
    })
  })

  // TODO: ADD DRAFT MANAGER TESTS
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe('draft manager', () => {})
})
