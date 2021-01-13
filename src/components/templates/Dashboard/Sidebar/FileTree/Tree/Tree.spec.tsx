import { screen } from '@testing-library/react'
import React from 'react'

import { render } from '../../../../../../test-utils'
import { getMockNodes } from '../../../../../../utils/testing/getMockNodes'
import {
  clickDropdownItem,
  openDropdown,
} from '../../../../../../utils/testing/userActions'
import { Tree } from './Tree'

describe('Tree', () => {
  const { fileNode, folderNode } = getMockNodes()

  it('should show children when toggled is true and tree has children', async () => {
    await render(
      <Tree
        node={{ ...folderNode, toggled: true, children: [fileNode] }}
        level={1}
      />
    )

    expect(screen.getByText(fileNode.name)).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from dropdown', async () => {
    await render(
      <Tree
        node={{ ...folderNode, toggled: true, children: [fileNode] }}
        level={1}
      />
    )

    await openDropdown(folderNode.name)

    await clickDropdownItem('Create file')

    expect(screen.getByLabelText('Input file name')).toBeInTheDocument()
  })
})
