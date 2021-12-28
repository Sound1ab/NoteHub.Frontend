import React, { createRef } from 'react'

import { Table } from './Table'
import { TableCell } from './TableCell/TableCell'
import { TableRow } from './TableRow/TableRow'

const mockElement = {
  children: [],
}

const mockAttributes = {
  'data-slate-node': 'element' as const,
  'data-slate-inline': true as const,
  'data-slate-void': true as const,
  ref: createRef(),
}

export const Primary = () => (
  <Table attributes={mockAttributes} element={mockElement as never}>
    <TableRow
      attributes={mockAttributes}
      element={
        {
          ...mockElement,
          children: [mockElement, mockElement, mockElement] as never,
        } as never
      }
      header={true}
    >
      <TableCell
        attributes={mockAttributes}
        element={mockElement as never}
        header
      >
        one
      </TableCell>
      <TableCell
        attributes={mockAttributes}
        element={mockElement as never}
        header
      >
        one
      </TableCell>
      <TableCell
        attributes={mockAttributes}
        element={mockElement as never}
        header
      >
        one
      </TableCell>
    </TableRow>
    <TableRow attributes={mockAttributes} element={mockElement as never}>
      <TableCell attributes={mockAttributes} element={mockElement as never}>
        one
      </TableCell>
      <TableCell attributes={mockAttributes} element={mockElement as never}>
        one
      </TableCell>
      <TableCell attributes={mockAttributes} element={mockElement as never}>
        one
      </TableCell>
    </TableRow>
  </Table>
)

export const Test = () => {
  return <div>hey</div>
}

export default {
  title: 'Components/Button',
  component: Primary,
}
