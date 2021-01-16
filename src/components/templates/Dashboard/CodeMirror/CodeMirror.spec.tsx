import { screen } from '@testing-library/react'
import React from 'react'

import { useFs } from '../../../../hooks/fs/useFs'
import { useReadActiveRetextSettings } from '../../../../hooks/localState/useReadActiveRetextSettings'
import { render } from '../../../../test-utils'
import { typeInTextArea } from '../../../../utils/testing/userActions'
import { Retext_Settings } from '../../../apollo/generated_components_typings'
import { CodeMirror } from './CodeMirror'

jest.mock('../../../../hooks/recoil/useActivePath')
jest.mock('../../../../hooks/recoil/useUnstagedChanges')
jest.mock('../../../../hooks/localState/useReadActiveRetextSettings', () => ({
  useReadActiveRetextSettings: jest.fn(),
}))
jest.mock('../../../../hooks/fs/useFs', () => ({
  useFs: jest.fn(),
}))

jest.setTimeout(10000)

describe('CodeMirror', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useReadActiveRetextSettings as jest.Mock).mockReturnValue({
      activeRetextSettings: [Retext_Settings.Spell],
    })
    ;(useFs as jest.Mock).mockReturnValue([
      { writeFile: jest.fn(), readFile: () => 'MOCK FILE CONTENT' },
    ])
  })
  xit('should show text editor', async () => {
    await render(<CodeMirror>{(textArea) => textArea}</CodeMirror>)

    expect(screen.getByText('MOCK FILE CONTENT')).toBeInTheDocument()
  })

  it('should underline text if file contains messages', async () => {
    ;(useReadActiveRetextSettings as jest.Mock).mockReturnValue({
      activeRetextSettings: [Retext_Settings.Spell],
    })
    ;(useFs as jest.Mock).mockReturnValue([
      { writeFile: jest.fn(), readFile: () => 'heelo' },
    ])

    await render(<CodeMirror>{(textArea) => textArea}</CodeMirror>)

    await typeInTextArea({
      text: 'some text wigh a spelling error',
    })

    await expect(screen.findByText('wigh')).resolves.toHaveAttribute(
      'style',
      'text-decoration: underline; text-decoration-color: var(--accent-primary); text-decoration-style: wavy;'
    )
  })

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
})
