import React from 'react'
import styled from 'styled-components'

import { useEquality } from '../../../../../hooks/recoil/retext/useEquality'
import { useIndefiniteArticle } from '../../../../../hooks/recoil/retext/useIndefiniteArticle'
import { useReadability } from '../../../../../hooks/recoil/retext/useReadability'
import { useRepeatedWords } from '../../../../../hooks/recoil/retext/useRepeatedWords'
import { useSpelling } from '../../../../../hooks/recoil/retext/useSpelling'
import { useFullWidth } from '../../../../../hooks/recoil/theme/useFullWidth'
import { useLargeText } from '../../../../../hooks/recoil/theme/useLargeText'
import { useLightTheme } from '../../../../../hooks/recoil/theme/useLightTheme'
import { Hr } from '../../../../atoms/Hr/Hr'
import { Toggle, ToggleButton } from '../../../../atoms/Toggle/Toggle'

export function Settings() {
  const [fullWidth, setFullWidth] = useFullWidth()
  const [largeText, setLargeText] = useLargeText()
  const [lightTheme, setLightTheme] = useLightTheme()
  const [equality, setEquality] = useEquality()
  const [indefiniteArticle, setIndefiniteArticle] = useIndefiniteArticle()
  const [readability, setReadability] = useReadability()
  const [repeatedWords, setRepeatedWords] = useRepeatedWords()
  const [spelling, setSpelling] = useSpelling()

  const settings = [
    {
      label: 'Light theme',
      initialValue: lightTheme,
      callback: setLightTheme,
    },
    {
      label: 'Full width text',
      initialValue: fullWidth,
      callback: setFullWidth,
    },
    {
      label: 'Large text',
      initialValue: largeText,
      callback: setLargeText,
    },
  ]

  const textChecks = [
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
      <h1>Settings</h1>
      <h3>Theme</h3>
      <Hr />
      {settings.map(({ callback, initialValue, label }) => (
        <Setting key={label}>
          <label htmlFor={label}>{label}</label>
          <Toggle onToggle={(on) => callback(on)} initialState={initialValue}>
            <ToggleButton id={label} />
          </Toggle>
        </Setting>
      ))}
      <h3>Text checks</h3>
      <Hr />
      {textChecks.map(({ callback, initialValue, label }) => (
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: var(--text-primary);
  margin-bottom: ${({ theme }) => theme.spacing.s};
`
