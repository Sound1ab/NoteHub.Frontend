import { screen } from '@testing-library/react'
import React from 'react'

import { useWidget } from '../../../../../hooks/recoil/useWidget'
import { render } from '../../../../../test-utils'
import { Widget } from './Widget'

jest.mock('../../../../../hooks/recoil/useWidget', () => ({
  useWidget: jest.fn(),
}))

describe('Widget', () => {
  it('should display widget', async () => {
    ;(useWidget as jest.Mock).mockReturnValue([
      { coords: { top: 1, left: 1 }, message: 'MOCK MESSAGE' },
    ])

    await render(<Widget />)

    expect(screen.getByText('MOCK MESSAGE')).toBeInTheDocument()
  })

  it('should not display widget if no widget given', async () => {
    ;(useWidget as jest.Mock).mockReturnValue([null])

    const { container } = await render(<Widget />)

    expect(container.firstChild).toBeNull()
  })
})
