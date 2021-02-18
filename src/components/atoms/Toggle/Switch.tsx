import React from 'react'
import styled, { css } from 'styled-components'

export interface ISwitch {
  on?: boolean
  id: string
  onClick?: () => void
}

export function Switch({ on = false, id, onClick }: ISwitch) {
  return (
    <label id={id} style={{ display: 'block' }}>
      <ToggleInput
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={() => null}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <ToggleButton on={on} />
    </label>
  )
}

const ToggleButton = styled.span<{ on: boolean }>`
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 3em;
  height: 1.5em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: #fbfbfb;
  border-radius: 4em;
  padding: 4px;
  transition: all 0.4s ease;
  border: 2px solid #e8eae9;

  &:active::after {
    box-sizing: initial;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),
      inset 0px 0px 0px 3px #9c9c9c;
    padding-right: 1.6em;
  }
  &::after {
    left: 0;
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    border-radius: 4em;
    background: #fbfbfb;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  }

  ${({ on }) =>
    on &&
    css`
      &::after {
        left: 50%;
      }
      & {
        background: #86d993;
      }
      &:active {
        box-shadow: none;
      }
      &:active::after {
        margin-left: -1.6em;
      }
    `};
`

const ToggleInput = styled.input`
  /* visually hidden but still accessible */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;

  &:focus + ${ToggleButton}::after {
    box-sizing: initial;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),
      inset 0px 0px 0px 3px #9c9c9c;
  }
`
