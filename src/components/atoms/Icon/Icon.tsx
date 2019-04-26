import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ICON_COLOR } from '../../../enums'
import { styled } from '../../../theme'

const Style = styled.a<{ marginRight: boolean; color: ICON_COLOR }>`
  position: relative;
  display: inline-block !important;
  padding: 10px;
  margin-right: ${({ theme, marginRight }) =>
    marginRight ? theme.spacing.xxxs : 0};

  .icon-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme, color }) => color === ICON_COLOR.DARK ? theme.colors.text.primary : theme.colors.text.tertiary};
  }
`

interface IIcon {
  color?: ICON_COLOR
  link?: string
  prefix?: 'fab'
  icon: 'github' | 'soundcloud' | 'pen-square' | 'moon'
  marginRight?: boolean
}

export function Icon({
  color = ICON_COLOR.LIGHT,
  link,
  icon,
  prefix,
  marginRight = false,
}: IIcon) {
  const FontAwesomeIconComponent = React.cloneElement(
    <FontAwesomeIcon
      icon={[prefix as any, icon]}
      size="xs"
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
    >
      {FontAwesomeIconComponent}
    </Style>
  ) : (
    React.createElement(
      Style.withComponent('div'),
      { marginRight, color },
      FontAwesomeIconComponent
    )
  )
}
