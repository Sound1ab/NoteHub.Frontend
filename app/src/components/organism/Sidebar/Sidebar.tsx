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

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
  }

  .title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export function Sidebar() {
  return (
    <Style>
      <Container className="wrapper">
        <Profile />
        <NewNotebook />
        <div className="title-wrapper">
          <Icon icon="book" prefix="fa" marginRight />
          <Heading
            color={COLOR.LIGHT}
            className="category-heading"
            type="h5"
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
