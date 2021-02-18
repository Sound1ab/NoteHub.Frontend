import React from 'react'
import styled from 'styled-components'

import { useEquality } from '../../../../../hooks/recoil/retext/useEquality'
import { useIndefiniteArticle } from '../../../../../hooks/recoil/retext/useIndefiniteArticle'
import { useReadability } from '../../../../../hooks/recoil/retext/useReadability'
import { useRepeatedWords } from '../../../../../hooks/recoil/retext/useRepeatedWords'
import { useSpelling } from '../../../../../hooks/recoil/retext/useSpelling'
import { Toggle, ToggleButton } from '../../../../atoms/Toggle/Toggle'

export function TextCheck() {
  const [equality, setEquality] = useEquality()
  const [indefiniteArticle, setIndefiniteArticle] = useIndefiniteArticle()
  const [readability, setReadability] = useReadability()
  const [repeatedWords, setRepeatedWords] = useRepeatedWords()
  const [spelling, setSpelling] = useSpelling()

  const settings = [
    {
      label: 'Equality',
      initialValue: equality,
      callback: setEquality,
    },
    {
      label: 'Indefinite article',
      initialValue: indefiniteArticle,
      callback: setIndefiniteArticle,
    },
    {
      label: 'Readability',
      initialValue: readability,
      callback: setReadability,
    },
    {
      label: 'Repeated words',
      initialValue: repeatedWords,
      callback: setRepeatedWords,
    },
    {
      label: 'Spelling',
      initialValue: spelling,
      callback: setSpelling,
    },
  ]

  return (
    <>
      <h1>Text Check</h1>
      {settings.map(({ callback, initialValue, label }) => (
        <Setting key={label}>
          <label htmlFor={label}>{label}</label>
          <Toggle onToggle={(on) => callback(on)} initialState={initialValue}>
            <ToggleButton id={label} />
          </Toggle>
        </Setting>
      ))}
    </>
  )
}

const Setting = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: var(--text-primary);
`
