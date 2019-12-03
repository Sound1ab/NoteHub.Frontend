import React from 'react'
import { cleanup, render } from '../../../test-utils'
import { Avatar } from './Avatar'

afterEach(cleanup)

describe('Avatar', () => {
  it('should show fallback if no image passed as prop', () => {
    const { container } = render(<Avatar />)

    const placeholder = container.querySelector('Avatar-placeholder')

    expect(placeholder).toBeDefined()
  })

  it('should show image if passed in as prop', function() {
    const MOCK_IMAGE = 'MOCK_IMAGE'

    const { container } = render(<Avatar image={MOCK_IMAGE} />)

    const image = container.querySelector('img')

    expect(image).toHaveAttribute('src', MOCK_IMAGE)
  })

  it('should apply className prop to style container', function() {
    const MOCK_CLASSNAME = 'MOCK_CLASSNAME'

    const {
      container: { firstChild },
    } = render(<Avatar className={MOCK_CLASSNAME} />)

    expect(firstChild).toHaveClass(MOCK_CLASSNAME)
  })
})
