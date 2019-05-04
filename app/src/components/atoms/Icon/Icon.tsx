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
        return '5px'
      case 'lg':
        return '10px'
      default:
        return '6px'
    }
  }};

  .Icon-svg {
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
        case COLOR.MEDIUM:
          return theme.colors.text.secondary
        default:
          return theme.colors.text.tertiary
      }
    }};

    &:hover {
      opacity: 0.8;
    }
  }
`

interface IIcon {
  icon:
    | 'github'
    | 'soundcloud'
    | 'pen-square'
    | 'moon'
    | 'book'
    | 'plus-circle'
    | 'trash'
    | 'sync'
    | 'times'
    | 'external-link-alt'
  color?: COLOR
  link?: string
  prefix?: 'fab' | 'fa'
  marginRight?: boolean
  size?: 'xs' | 'sm' | 'lg'
  onClick?: () => void
}

export function Icon({
  link,
  icon,
  prefix,
  onClick,
  marginRight = false,
  color = COLOR.LIGHT,
  size = 'xs',
}: IIcon) {
  const FontAwesomeIconComponent = React.cloneElement(
    <FontAwesomeIcon
      icon={[prefix as any, icon]}
      size={size}
      className="Icon-svg"
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
      onClick={onClick}
    >
      {FontAwesomeIconComponent}
    </Style>
  ) : (
    React.createElement(
      Style.withComponent('div'),
      { marginRight, color, size, onClick },
      FontAwesomeIconComponent
    )
  )
}
