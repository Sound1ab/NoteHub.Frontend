import styled from 'styled-components'

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.m};
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.m} 0;
  }
`

export const FullBleedSection = styled(Section)`
  width: 100%;
  grid-column: 1 / 4 !important;
`
