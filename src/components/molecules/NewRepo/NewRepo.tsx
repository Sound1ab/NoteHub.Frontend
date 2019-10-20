import React, {
  useContext,
} from 'react'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'
import { NewRepoContext } from '../../organisms'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  .NewRepo-heading {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function NewRepo() {
  const context = useContext(NewRepoContext)

  function handleOnClick(){
    if (!context) {
      return
    }
    const {isNewRepoOpen, setIsModalOpen} = context
    setIsModalOpen(!isNewRepoOpen)
  }

  return (
    <Style onClick={handleOnClick}>
      <Icon size="sm" icon="plus-circle" prefix="fa" marginRight />
      <Heading className="NewRepo-heading" type="h4">
        New Repo
      </Heading>
    </Style>
  )
}
