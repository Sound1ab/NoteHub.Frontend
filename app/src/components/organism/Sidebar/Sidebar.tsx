import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'
import { Navigation, NewNotebook, Profile } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};

  .Sidebar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
  }

  .Sidebar-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export function Sidebar() {
  return (
    <Style>
      <Container className="Sidebar-wrapper">
        <Profile />
        <NewNotebook />
        <div className="Sidebar-title-wrapper">
          <Icon icon="book" prefix="fa" marginRight />
          <Heading
            color={COLOR.LIGHT}
            className="category-heading"
            type="h4"
            textTransform="uppercase"
          >
            Notebooks
          </Heading>
        </div>
        <Navigation />
      </Container>
    </Style>
  )
}
