import React from 'react'
import { TOGGLES } from '../../../enums'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.brand};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;

  h6 {
    color: ${({ theme }) => theme.colors.brand};
  }

  button + button {
    border-left: 1px solid ${({ theme }) => theme.colors.brand};
  }

  > button {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xs};
  }

  .toggle-active {
    background-color: ${({ theme }) => theme.colors.brand};
    h6 {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }
`

interface IToggle {
  toggles: TOGGLES[]
  activeToggle: TOGGLES
  setToggle: (toggle: TOGGLES, e: React.MouseEvent<HTMLElement>) => void
}

export function Toggle({ toggles, activeToggle, setToggle }: IToggle) {
  return (
    <Style>
      {toggles.map(toggle => (
        <button
          data-testid={toggle}
          key={toggle}
          className={activeToggle === toggle ? 'toggle-active' : ''}
          onClick={setToggle.bind(null, toggle)}
        >
          <Heading type="h6">{toggle}</Heading>
        </button>
      ))}
    </Style>
  )
}
