import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadIsNewFileOpen, useReadRepo } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'
import { FileInput, Files } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: cardlist;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xxxl};
    max-width: 50vw;
  }

  .Cardlist-header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text.primary};
    overflow: hidden;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
  }

  .Cardlist-header-heading {
    font-weight: bold;
  }
`

export function CardList() {
  const { repo } = useReadRepo()
  const { isNewFileOpen } = useReadIsNewFileOpen()

  return (
    <Style id={CONTAINER_ID.CARDLIST}>
      {repo?.private && (
        <div className="Cardlist-header">
          <Heading className="Cardlist-header-heading" type="h4">
            Private repo
          </Heading>
        </div>
      )}
      {isNewFileOpen && <FileInput />}
      <Files />
    </Style>
  )
}
