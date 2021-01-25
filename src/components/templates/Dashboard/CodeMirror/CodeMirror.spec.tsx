import React from 'react'

import * as useFs from '../../../../hooks/fs/useFs'
import * as useActivePath from '../../../../hooks/recoil/useActivePath'
import { render } from '../../../../test-utils'
import { spyOn } from '../../../../utils/testing/spyOn'
import { CodeMirror } from './CodeMirror'

jest.mock('../../../../hooks/recoil/useActivePath')
jest.mock('../../../../hooks/recoil/useUnstagedChanges')
jest.mock('../../../../hooks/fs/useFs')

describe('CodeMirror', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not load file content if active path is not a file', async () => {
    const readFile = jest.fn()

    spyOn(useActivePath, 'useActivePath', () => ['MOCK_FOLDER_PATH'])
    spyOn(useFs, 'useFs', () => [{ writeFile: jest.fn(), readFile }])

    await render(
      <CodeMirror fileContent="MOCK FILE CONTENT">{'MOCK CHILDREN'}</CodeMirror>
    )

    expect(readFile).not.toBeCalled()
  })
})
