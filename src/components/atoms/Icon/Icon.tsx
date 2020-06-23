import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

const Style = styled.div<
  Pick<IIcon, 'marginLeft' | 'marginRight' | 'size' | 'isDisabled'>
>`
  position: relative;
  display: inline-block !important;
  margin-right: ${({ theme, marginRight }) =>
    marginRight ? theme.spacing.xxs : 0};
  margin-left: ${({ theme, marginLeft }) =>
    marginLeft ? theme.spacing.xxs : 0};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};

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
  | 'file'
  | 'folder'
  | 'spinner'

interface IIcon {
  icon: TIcons
  color?: COLOR
  prefix?: 'fab' | 'fa'
  marginRight?: boolean
  marginLeft?: boolean
  size?: 'xs' | 'sm' | 'lg'
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
  title?: string
  ariaLabel?: string
  isDisabled?: boolean
}

export function Icon({
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
  isDisabled,
}: IIcon) {
  return (
    <Style
      className={className}
      color={color}
      marginRight={marginRight}
      marginLeft={marginLeft}
      size={size}
      onClick={onClick}
      aria-label={ariaLabel}
      isDisabled={isDisabled}
    >
      <FontAwesomeIcon
        icon={[prefix as any, icon]}
        size={size}
        className="Icon-svg"
        title={title}
      />
    </Style>
  )
}
