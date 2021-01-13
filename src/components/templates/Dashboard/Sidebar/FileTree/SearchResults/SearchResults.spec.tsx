import { screen } from '@testing-library/react'
import React from 'react'

import { useReadSearch } from '../../../../../../hooks/localState/useReadSearch'
import * as recoil from '../../../../../../hooks/recoil/useFiles'
import { render } from '../../../../../../test-utils'
import { spyOn } from '../../../../../../utils/testing/spyOn'
import { SearchResults } from './SearchResults'

jest.mock('../../../../../../hooks/localState/useReadSearch')
jest.mock('../../../../../../hooks/recoil/useFiles')

describe('SearchResults', () => {
  const search = 'MOCK_FILE'

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useReadSearch as jest.Mock).mockImplementation(() => search)
  })

  it('should display all files', async () => {
    await render(<SearchResults />)

    expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
  })

  it('should not display folders', async () => {
    await render(<SearchResults />)

    expect(screen.queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
  })

  it('should return null if there are no gitNodes', async () => {
    spyOn(recoil, 'useFiles', () => [[], jest.fn()])

    const { container } = await render(<SearchResults />)

    expect(container.firstChild).toBeNull()
  })
})
