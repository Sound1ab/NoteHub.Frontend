import React from 'react'
import styled from 'styled-components'

import { Features } from './Features/Features'
import { Footer } from './Footer/Footer'
import { Hero } from './Hero/Hero'
import { MarkdownFeatures } from './MarkdownFeatures/MarkdownFeatures'
import { Navigation } from './Navigation/Navigation'
import { Screenshots } from './Screenshots/Screenshots'
import { Signup } from './Signup/Signup'

export function LandingPage() {
  return (
    <>
      <Navigation />
      <Main>
        <Hero />
        <Screenshots />
        <Features />
        <MarkdownFeatures />
        <Signup />
      </Main>
      <Footer />
    </>
  )
}

const Main = styled.main`
  display: grid;
  grid-template-columns:
    1fr
    min(${({ theme }) => theme.breakpoints.tablet}, 100%)
    1fr;

  & > * {
    grid-column: 2;
  }
`
