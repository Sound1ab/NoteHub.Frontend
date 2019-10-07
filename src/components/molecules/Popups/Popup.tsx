import React from 'react'
import {default as ReactjsPopup, Position} from 'reactjs-popup'
import { styled } from '../../../theme'

const Style = styled.div`
  .Popup-content {
    padding: ${({ theme }) => theme.spacing.xs}!important;
    background-color: ${({ theme }) =>
  theme.colors.background.tertiary}!important;
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.2) !important;
    border: none !important;
    border-radius: 5px;

    & > button + button {
      margin-top: ${({ theme }) => theme.spacing.xs};
    }
  }

  .Popup-arrow {
    background-color: ${({ theme }) =>
  theme.colors.background.tertiary}!important;
    border: none !important;
    box-shadow: none !important;
  }
`

interface IPopup {
  trigger: JSX.Element,
  children: JSX.Element,
  position: Position,
}

export function Popup({ trigger, position, children }: IPopup) {
  return (
    <Style>
      <ReactjsPopup
        trigger={trigger}
        position={position}
        className="Popup"
      >
        {children}
      </ReactjsPopup>
    </Style>
  )
}
