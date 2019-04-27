import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

const Style = styled.a<{ marginRight: boolean; color: COLOR; size: string }>`
  position: relative;
  display: inline-block !important;
  margin-right: ${({ theme, marginRight }) =>
    marginRight ? theme.spacing.xxs : 0};
  padding: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '6px'
      case 'sm':
        return '10px'
      case 'lg':
        return '10px'
      default:
        return '6px'
    }
  }};

  .icon-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme, color }) => {
      switch (color) {
        case COLOR.DARK:
          return theme.colors.text.primary
        case COLOR.LIGHT:
          return theme.colors.text.tertiary
        case COLOR.ACCENT:
          return theme.colors.accent
        default:
          return theme.colors.text.tertiary
      }
    }}
`

interface IIcon {
  color?: COLOR
  link?: string
  prefix?: 'fab' | 'fa'
  icon: 'github' | 'soundcloud' | 'pen-square' | 'moon' | 'book' | 'plus-circle'
  marginRight?: boolean
  size?: 'xs' | 'sm' | 'lg'
}

export function Icon({
  color = COLOR.LIGHT,
  link,
  icon,
  prefix,
  marginRight = false,
  size = 'xs',
}: IIcon) {
  const FontAwesomeIconComponent = React.cloneElement(
    <FontAwesomeIcon
      icon={[prefix as any, icon]}
      size={size}
      className="icon-svg"
    />
  )
  return link ? (
    <Style
      color={color}
      href={link}
      rel="noopener"
      target="_blank"
      marginRight={marginRight}
      size={size}
    >
      {FontAwesomeIconComponent}
    </Style>
  ) : (
    React.createElement(
      Style.withComponent('div'),
      { marginRight, color, size },
      FontAwesomeIconComponent
    )
  )
}
