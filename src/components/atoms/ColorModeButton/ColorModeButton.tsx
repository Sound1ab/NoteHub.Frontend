import React, { useContext } from 'react'
import { Icon } from '../'
import { COLOR_MODE } from '../../../enums'
import { styled } from '../../../theme'
import { ColorModeContext } from '../../utility'

const Style = styled.div<{ colorMode: COLOR_MODE }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, colorMode }) =>
  colorMode === COLOR_MODE.DARK
    ? theme.colors.accent
    : theme.colors.text.primary};
`

export function ColorModeButton() {
  const {colorMode, setColorMode} = useContext(ColorModeContext)
  const oppositeColorMode =
    colorMode === COLOR_MODE.LIGHT ? COLOR_MODE.DARK : COLOR_MODE.LIGHT
  return (
    <Style
      onClick={setColorMode.bind(null, oppositeColorMode)}
      colorMode={colorMode}
    >
      <Icon icon="moon" size="sm" marginLeft/>
    </Style>
  )
}