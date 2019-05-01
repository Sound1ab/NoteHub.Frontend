import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: transparent;

  .CardHeader-options {
    cursor: pointer;
  }
`

interface ICardHeader {
  title?: string | null
}

export function CardHeader({ title = '' }: ICardHeader) {
  return (
    <Style>
      <div className="header">
        <Heading type="h2" marginBottom>
          {title}
        </Heading>
        <div className="CardHeader-options">
          <Icon
            color={COLOR.MEDIUM}
            icon="sync"
            prefix="fa"
            marginRight
            size="sm"
          />
          <Icon
            color={COLOR.MEDIUM}
            icon="trash"
            prefix="fa"
            marginRight
            size="sm"
          />
        </div>
      </div>
    </Style>
  )
}
