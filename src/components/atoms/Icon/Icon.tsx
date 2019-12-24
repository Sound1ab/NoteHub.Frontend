import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

// eslint-disable-next-line
const Style = styled.a<{
  marginRight: boolean
  marginLeft: boolean
  color?: COLOR
  size: string
}>`
  position: relative;
  display: inline-block !important;
  margin-right: ${({ theme, marginRight }) =>
    marginRight ? theme.spacing.xxs : 0};
  margin-left: ${({ theme, marginLeft }) =>
    marginLeft ? theme.spacing.xxs : 0};

  padding: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '5px'
      case 'sm':
        return '6px'
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
  }
`

export type TIcons =
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
  | 'chevron-right'
  | 'chevron-down'
  | 'ellipsis-h'
  | 'grip-lines-vertical'
  | 'product-hunt'
  | 'edit'
  | 'pen'
  | 'image'
  | 'sign-out-alt'

interface IIcon {
  icon: TIcons
  color?: COLOR
  link?: string
  prefix?: 'fab' | 'fa'
  marginRight?: boolean
  marginLeft?: boolean
  size?: 'xs' | 'sm' | 'lg'
  onClick?: () => void
  className?: string
  title?: string
  ariaLabel?: string
}

export function Icon({
  link,
  icon,
  prefix,
  onClick,
  marginRight = false,
  marginLeft = false,
  color,
  size = 'xs',
  className,
  title,
  ariaLabel,
}: IIcon) {
  const FontAwesomeIconComponent = React.cloneElement(
    <FontAwesomeIcon
      icon={[prefix as any, icon]}
      size={size}
      className="Icon-svg"
      title={title}
    />
  )
  return link ? (
    <Style
      className={className}
      color={color}
      href={link}
      rel="noopener"
      target="_blank"
      marginRight={marginRight}
      marginLeft={marginLeft}
      size={size}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {FontAwesomeIconComponent}
    </Style>
  ) : (
    React.createElement(
      Style.withComponent('div'),
      {
        className,
        marginRight,
        marginLeft,
        color,
        size,
        onClick,
        'aria-label': ariaLabel,
      },
      FontAwesomeIconComponent
    )
  )
}
