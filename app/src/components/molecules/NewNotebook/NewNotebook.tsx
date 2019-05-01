import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s};
`

export function NewNotebook() {
  return (
    <Style>
      <Icon
        size="lg"
        color={COLOR.ACCENT}
        icon="plus-circle"
        prefix="fa"
        marginRight
      />
      <Heading color={COLOR.LIGHT} type="h3">
        New Notebook
      </Heading>
    </Style>
  )
}
