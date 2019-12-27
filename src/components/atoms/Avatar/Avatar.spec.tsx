import React from 'react'

import { cleanup, render } from '../../../test-utils'
import { Avatar } from './Avatar'

afterEach(cleanup)

describe('Avatar', () => {
  it('should show fallback if no image passed as prop', async () => {
    const { container } = await render(<Avatar />)

    const placeholder = container.querySelector('Avatar-placeholder')

    expect(placeholder).toBeDefined()
  })

  it('should show image if passed in as prop', async () => {
    const MOCK_IMAGE = 'MOCK_IMAGE'

    const { container } = await render(<Avatar image={MOCK_IMAGE} />)

    const image = container.querySelector('img')

    expect(image).toHaveAttribute('src', MOCK_IMAGE)
  })

  it('should apply className prop to style container', async () => {
    const MOCK_CLASSNAME = 'MOCK_CLASSNAME'

    const {
      container: { firstChild },
    } = await render(<Avatar className={MOCK_CLASSNAME} />)

    expect(firstChild).toHaveClass(MOCK_CLASSNAME)
  })
})
