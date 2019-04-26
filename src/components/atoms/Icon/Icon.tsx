import React from 'react'
import { styled } from '../../../theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Style = styled.a<{ marginRight: boolean }>`
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
    color: ${({theme}) => theme.colors.text.tertiary}
  }
`

interface IIcon {
  link?: string
  prefix?: 'fab'
  icon: 'github' | 'soundcloud' | 'pen-square' | 'moon'
  marginRight?: boolean
}

export function Icon({ link, icon, prefix, marginRight = false }: IIcon) {
  const FontAwesomeIconComponent = React.cloneElement(
    <FontAwesomeIcon
      icon={[prefix as any, icon]}
      size="xs"
      className="icon-svg"
    />
  )
  return link ? (
    <Style href={link} rel="noopener" target="_blank" marginRight={marginRight}>
      {FontAwesomeIconComponent}
    </Style>
  ) : (
    React.createElement(
      Style.withComponent('div'),
      { marginRight },
      FontAwesomeIconComponent
    )
  )
}
