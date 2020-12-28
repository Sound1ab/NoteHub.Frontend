import React from 'react'
import ReactSpinner from 'react-spinkit'
import styled from 'styled-components'

export function Spinner() {
  return <StyledSpinner name="chasing-dots" />
}

const StyledSpinner = styled(ReactSpinner)`
  margin: 0 auto;
  color: var(--white) !important;
  top: 50%;
  transform: translateY(-50%);
`
