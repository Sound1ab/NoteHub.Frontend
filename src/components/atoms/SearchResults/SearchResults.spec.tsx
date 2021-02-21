// import { screen } from '@testing-library/react'
// import React from 'react'

// import * as useFiles from '../../../hooks/recoil/useFiles'
import * as useSearch from '../../../hooks/recoil/useSearch'
// import { render } from '../../../test-utils'
import { spyOn } from '../../../utils/testing/spyOn'

// import { SearchResults } from './SearchResults'

jest.mock('../../../../../../hooks/recoil/useFiles')
jest.mock('../../../../../../hooks/recoil/useSearch')

describe('SearchResults', () => {
  const search = 'MOCK_FILE'

  beforeEach(() => {
    jest.resetAllMocks()
    spyOn(useSearch, 'useSearch', () => [search, jest.fn()])
  })

  // it('should display all files', async () => {
  //   await render(<SearchResults />)
  //
  //   expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
  // })
  //
  // it('should not display folders', async () => {
  //   await render(<SearchResults />)
  //
  //   expect(screen.queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
  // })
  //
  // it('should return null if there are no gitNodes', async () => {
  //   spyOn(useFiles, 'useFiles', () => [[], jest.fn()])
  //
  //   const { container } = await render(<SearchResults />)
  //
  //   expect(container.firstChild).toBeNull()
  // })
})
