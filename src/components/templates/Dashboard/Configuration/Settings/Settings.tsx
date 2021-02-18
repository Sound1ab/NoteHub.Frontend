import React from 'react'
import styled from 'styled-components'

import { useFullWidth } from '../../../../../hooks/recoil/theme/useFullWidth'
import { useLargeText } from '../../../../../hooks/recoil/theme/useLargeText'
import { useLightTheme } from '../../../../../hooks/recoil/theme/useLightTheme'
import { Hr } from '../../../../atoms/Hr/Hr'
import { Toggle, ToggleButton } from '../../../../atoms/Toggle/Toggle'

export function Settings() {
  const [fullWidth, setFullWidth] = useFullWidth()
  const [largeText, setLargeText] = useLargeText()
  const [lightTheme, setLightTheme] = useLightTheme()

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
    </>
  )
}

const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: var(--text-primary);
  margin-top: ${({ theme }) => theme.spacing.s};
`
