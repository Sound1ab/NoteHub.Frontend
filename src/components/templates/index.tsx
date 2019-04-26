import React from 'react'
import { styled } from '../../theme'

const Style = styled.div`
  position: relative;
`

interface ITest {
  dummyProp: string
}

export function OTest({ dummyProp = '' }: ITest) {
  return (
    <Style>
      {dummyProp}
    </Style>
  )
}
