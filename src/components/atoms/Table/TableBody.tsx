import React, { useRef } from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

import { useModalToggle } from '../../../hooks/utils/useModalToggle'
import { Fade } from '../../animation/Mount/Fade'
import { Button } from '../Button/Button'
import { Dropdown, IDropdownItem } from '../Dropdown/Dropdown'
import { Icon } from '../Icon/Icon'

interface ITableBody {
  children: RenderElementProps['children']
  attributes: RenderElementProps['attributes']
}

export function TableBody({ children, attributes }: ITableBody) {
  const containerRef = useRef<HTMLTableSectionElement>(null)

  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>({
    origin: containerRef,
    placement: 'top',
    hasTopPadding: false,
  })

  const items: IDropdownItem[] = [
    {
      label: 'test',
      onClick() {
        console.log('here')
      },
    },
  ]

  function handleOnClick() {
    setOpen(true)
  }

  return (
    <>
      <TBody ref={containerRef}>
        <tr {...attributes}>
          {children}
          <td>
            <Menu onClick={handleOnClick}>
              <StyledIcon size="xs" icon="ellipsis-h" isDisabled={false} />
            </Menu>
          </td>
        </tr>
      </TBody>
      <Fade show={isOpen}>
        <Portal>
          <Dropdown containerRef={ref} items={items} />
        </Portal>
      </Fade>
    </>
  )
}

export const TBody = styled.tbody`
  position: relative;
  border-bottom: solid ${({ theme }) => theme.spacing.xxxs}
    var(--background-tertiary);
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
