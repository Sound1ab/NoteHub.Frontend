import React from 'react'
import styled from 'styled-components'
import ReactSpinner from 'react-spinkit'

interface ISpinner {
  name:
    | 'three-bounce'
    | 'double-bounce'
    | 'rotating-plane'
    | 'folding-cube'
    | 'wave'
    | 'wandering-cubes'
    | 'pulse'
    | 'chasing-dots'
    | 'circle'
    | 'cube-grid'
    | 'wordpress'
    | 'ball-grid-beat'
    | 'ball-grid-pulse'
    | 'line-spin-fade-loader'
    | 'ball-spin-fade-loader'
    | 'ball-pulse-rise'
    | 'line-scale'
    | 'line-scale-pulse-out'
    | 'line-scale-pulse-out-rapid'
    | 'line-scale-party'
    | 'ball-triangle-path'
    | 'ball-scale-ripple-multiple'
    | 'ball-pulse-sync'
    | 'ball-beat'
    | 'ball-scale-multiple'
    | 'ball-zig-zag'
    | 'ball-zig-zag-deflect'
    | 'ball-clip-rotate'
    | 'ball-clip-rotate-pulse'
    | 'ball-clip-rotate-multiple'
    | 'ball-scale-ripple'
    | 'triangle-skew-spin'
    | 'pacman'
}

export function Spinner({ name }: ISpinner) {
  return <StyledSpinner name={name} />
}

const StyledSpinner = styled(ReactSpinner)`
  margin: 0 auto;
  color: var(--white) !important;
  top: 50%;
  transform: translateY(-50%);
`
