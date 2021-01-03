import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

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
  | 'align-justify'
  | 'binoculars'
  | 'rocket'
  | 'info-circle'
  | 'circle'
  | 'check-circle'

interface IIcon {
  icon: TIcons
  prefix?: 'fas' | 'fab' | 'far' | 'fal' | 'fad'
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
  prefix = 'fas',
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
      <StyledFontAwesomeIcon icon={[prefix, icon]} size="1x" title={title} />
    </Wrapper>
  )
}

const Wrapper = styled.div<
  Pick<IIcon, 'marginLeft' | 'marginRight' | 'size' | 'isDisabled'>
>`
  position: relative;
  display: flex;
  margin-right: ${({ theme, marginRight }) =>
    marginRight ? theme.spacing.xxs : 0};
  margin-left: ${({ theme, marginLeft }) =>
    marginLeft ? theme.spacing.xxs : 0};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};
  width: 1.15em;
  height: 1.15em;
  align-items: center;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
