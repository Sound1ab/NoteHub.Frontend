import React, { useRef } from 'react'
import { css } from 'styled-components'

import { useModalToggle } from '../../../../../hooks'
import { styled } from '../../../../../theme'
import { Fade } from '../../../../animation'
import { Dropdown, Icon } from '../../../../atoms'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { ToolbarButton } from '../ToolbarButton/ToolbarButton'

export function ColorPicker() {
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()

  function handleButtonClick() {
    setOpen(true)
  }

  function handleSwatchClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const { backgroundColor } = getComputedStyle(e.target as Element)

    localState.accentColorVar(backgroundColor)
  }

  return (
    <>
      <ToolbarButton
        ref={containerRef}
        onClick={handleButtonClick}
        title="Set accent color"
      >
        <Icon size="1x" icon="eye-dropper" />
      </ToolbarButton>
      <Fade show={isOpen}>
        <Portal
          domNode={containerRef.current}
          placementAroundContainer="bottom-left"
        >
          <Dropdown
            containerRef={ref}
            items={[
              {
                label: 'Swatches',
                custom: (
                  <List>
                    <Swatch
                      onClick={handleSwatchClick}
                      aria-label="primary swatch"
                      color="primary"
                    />
                    <Swatch
                      onClick={handleSwatchClick}
                      aria-label="secondary swatch"
                      color="secondary"
                    />
                    <Swatch
                      onClick={handleSwatchClick}
                      aria-label="tertiary swatch"
                      color="tertiary"
                    />
                  </List>
                ),
              },
            ]}
          />
        </Portal>
      </Fade>
    </>
  )
}

const List = styled.li`
  margin-bottom: 0;
  line-height: 0;
  svg + svg {
    margin-left: ${({ theme }) => theme.spacing.xxs};
  }
`

const Swatch = styled.svg<{ color: 'primary' | 'secondary' | 'tertiary' }>`
  width: ${({ theme }) => theme.spacing.s};
  height: ${({ theme }) => theme.spacing.s};

  ${({ color }) => {
    switch (color) {
      case 'primary':
        return css`
          background-color: ${({ theme }) =>
            theme.colors.accentChoices.primary};
        `
      case 'secondary':
        return css`
          background-color: ${({ theme }) =>
            theme.colors.accentChoices.secondary};
        `
      case 'tertiary':
        return css`
          background-color: ${({ theme }) =>
            theme.colors.accentChoices.tertiary};
        `
    }
  }};
`
