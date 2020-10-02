import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef } from 'react'

import { useModalToggle } from '../../../hooks'
import { styled } from '../../../theme'
import { Fade } from '../../animation'
import { Button, Dropdown, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-block;
  }

  .ColorPicker-dropdown {
    position: absolute;
    top: calc(100% + ${({ theme }) => theme.spacing.xs});
    right: ${({ theme }) => theme.spacing.xs};
    z-index: 100;
  }

  .ColorPicker-list {
    margin-bottom: 0;
    line-height: 0;
    svg + svg {
      margin-left: ${({ theme }) => theme.spacing.xxs};
    }
  }

  .ColorPicker-swatch {
    background-color: ${({ theme }) => theme.colors.accent};
    width: ${({ theme }) => theme.spacing.s};
    height: ${({ theme }) => theme.spacing.s};
  }

  .ColorPicker-swatch-1 {
    background-color: ${({ theme }) => theme.colors.accentChoices.primary};
  }

  .ColorPicker-swatch-2 {
    background-color: ${({ theme }) => theme.colors.accentChoices.secondary};
  }

  .ColorPicker-swatch-3 {
    background-color: ${({ theme }) => theme.colors.accentChoices.tertiary};
  }

  .ColorPicker-swatch-4 {
    background-color: ${({ theme }) => theme.colors.accentChoices.quaternary};
  }

  .ColorPicker-swatch-5 {
    background-color: ${({ theme }) => theme.colors.accentChoices.quinary};
  }
`

export function ColorPicker() {
  const client = useApolloClient()
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  function handleButtonClick() {
    setOpen(true)
  }

  function handleSwatchClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const { backgroundColor } = getComputedStyle((e as any).target)

    client.writeData({ data: { accentColor: backgroundColor } })
  }

  return (
    <Style ref={containerRef}>
      <Button
        className="Toolbar-button"
        onClick={handleButtonClick}
        title="Set accent color"
      >
        <Icon size="sm" icon="eye-dropper" prefix="fa" />
      </Button>
      <Fade show={isOpen}>
        <Portal domNode={containerRef.current} className="ColorPicker-dropdown">
          <Dropdown
            ref={ref}
            items={[
              {
                label: 'Swatches',
                custom: (
                  <li className="ColorPicker-list">
                    <svg
                      onClick={handleSwatchClick}
                      className="ColorPicker-swatch ColorPicker-swatch-1"
                      aria-label="primary swatch"
                    />
                    <svg
                      onClick={handleSwatchClick}
                      className="ColorPicker-swatch ColorPicker-swatch-2"
                      aria-label="secondary swatch"
                    />
                    <svg
                      onClick={handleSwatchClick}
                      className="ColorPicker-swatch ColorPicker-swatch-3"
                      aria-label="tertiary swatch"
                    />
                  </li>
                ),
              },
            ]}
          />
        </Portal>
      </Fade>
    </Style>
  )
}
