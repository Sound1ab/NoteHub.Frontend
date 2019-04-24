import React from 'react'
import { styled } from '../../../theme'

export const Image = styled.img<{ src: string }>`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`
