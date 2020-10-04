import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

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
  | 'eye-dropper'
  | 'list-ol'
  | 'code'
  | 'list'
  | 'italic'
  | 'bold'
  | 'minus'
  | 'quote-right'
  | 'columns'
  | 'link'
  | 'table'
  | 'bars'

interface IIcon {
  icon: TIcons
  color?: COLOR
  prefix?: 'fab' | 'fa'
  marginRight?: boolean
  marginLeft?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  title?: string
  ariaLabel?: string
  isDisabled?: boolean
}

export function Icon({
  marginRight = false,
  marginLeft = false,
  size = 'xs',
  prefix,
  title,
  icon,
  ...rest
}: IIcon) {
  return (
    <Wrapper
      {...rest}
      marginRight={marginRight}
      marginLeft={marginLeft}
      size={size}
    >
      <StyledFontAwesomeIcon
        icon={[prefix as any, icon]}
        size={size}
        title={title}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<
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
        return '5px'
      case 'lg':
        return '10px'
      default:
        return '6px'
    }
  }};
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
