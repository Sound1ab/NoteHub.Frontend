import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { TBody, TableBody } from './TableBody'
import { TableHead } from './TableHead'

interface ITableRow extends RenderElementProps {
  header?: boolean
  footer?: boolean
}

export function TableRow({ attributes, children, header, element }: ITableRow) {
  console.log('here', element.children.length)
  return (
    <>
      {header && (
        <TableHead>
          <tr>
            {element.children.map((_, index) => (
              <MenuCell key={index}>
                <Menu>
                  <StyledIcon size="xs" icon="ellipsis-h" isDisabled={false} />
                </Menu>
              </MenuCell>
            ))}
          </tr>
          <tr {...attributes}>{children}</tr>
        </TableHead>
      )}
      {!header && <TableBody attributes={attributes}>{children}</TableBody>}
    </>
  )
}

const MenuCell = styled.td`
  text-align: center;
  display: flex;
  justify-content: center;
`

const Menu = styled(Button)`
  color: var(--text-primary);
  height: 100%;
  opacity: 1;

  @media (hover: hover) and (pointer: fine) {
    ${TBody}:hover:not(:disabled) & {
      opacity: 1;
    }
  }
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
`
