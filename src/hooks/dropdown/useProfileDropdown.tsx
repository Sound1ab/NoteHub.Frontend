import React from 'react'

import { CheckboxItem } from '../../components/atoms/Dropdown/CheckboxItem/CheckboxItem'
import { ColorPickerItem } from '../../components/atoms/Dropdown/ColorPickerItem/ColorPickerItem'
import { RadioItem } from '../../components/atoms/Dropdown/RadioItem/RadioItem'
import { FONT } from '../../enums'
import { useLogout } from '../authorization/useLogout'
import { useEquality } from '../recoil/retext/useEquality'
import { useIndefiniteArticle } from '../recoil/retext/useIndefiniteArticle'
import { useReadability } from '../recoil/retext/useReadability'
import { useRepeatedWords } from '../recoil/retext/useRepeatedWords'
import { useSpelling } from '../recoil/retext/useSpelling'
import { useFont } from '../recoil/theme/useFont'
import { useFullWidth } from '../recoil/theme/useFullWidth'
import { useLargeText } from '../recoil/theme/useLargeText'
import { useLightTheme } from '../recoil/theme/useLightTheme'
import { useReadGithubUser } from '../user/useReadGithubUser'

export function useProfileDropdown() {
  const [equality, setEquality] = useEquality()
  const [indefiniteArticle, setIndefiniteArticle] = useIndefiniteArticle()
  const [readability, setReadability] = useReadability()
  const [repeatedWords, setRepeatedWords] = useRepeatedWords()
  const [spelling, setSpelling] = useSpelling()
  const [font, setFont] = useFont()
  const [fullWidth, setFullWidth] = useFullWidth()
  const [largeText, setLargeText] = useLargeText()
  const [LightTheme, setLightTheme] = useLightTheme()
  const [logout, { called, data, error }] = useLogout()
  const user = useReadGithubUser()

  if (error) {
    alert('Could not logout. Please try again.')
  }

  function gitlink() {
    window.open(user?.html_url)
  }

  async function handleLogout() {
    await logout()
  }

  const items = [
    {
      heading: 'Font',
      custom: (
        <RadioItem
          label="Default"
          value={FONT.IS_DEFAULT}
          title="Default font"
          checked={font === FONT.IS_DEFAULT}
          onChange={setFont}
          group="font"
        />
      ),
    },
    {
      custom: (
        <RadioItem
          label="Serif"
          value={FONT.IS_SERIF}
          title="Serif font"
          checked={font === FONT.IS_SERIF}
          onChange={setFont}
          group="font"
        />
      ),
    },
    {
      custom: (
        <RadioItem
          label="Mono"
          value={FONT.IS_MONO}
          title="Mono font"
          checked={font === FONT.IS_MONO}
          onChange={setFont}
          group="font"
        />
      ),
      hasSeparator: true,
    },
    {
      heading: 'Theme',
      custom: (
        <CheckboxItem
          label="Light mode"
          value={!LightTheme}
          title="Activate light mode"
          checked={LightTheme}
          onChange={setLightTheme}
        />
      ),
    },
    {
      custom: (
        <CheckboxItem
          label="Full width"
          value={!fullWidth}
          title="Increase width of the editor"
          checked={fullWidth}
          onChange={setFullWidth}
        />
      ),
    },
    {
      custom: (
        <CheckboxItem
          label="Large text"
          value={!largeText}
          title="Increase size of text"
          checked={largeText}
          onChange={setLargeText}
        />
      ),
    },
    {
      custom: <ColorPickerItem />,
      hasSeparator: true,
    },
    {
      heading: 'style check',
      label: 'Spelling',
      custom: (
        <CheckboxItem
          label="Spelling"
          value={!spelling}
          title="Checks spelling"
          checked={spelling}
          onChange={setSpelling}
        />
      ),
    },
    {
      label: 'Readability',
      custom: (
        <CheckboxItem
          label="Readability"
          value={!readability}
          title="Detects possibly hard to read sentences"
          checked={readability}
          onChange={setReadability}
        />
      ),
    },
    {
      label: 'Repeated Words',
      custom: (
        <CheckboxItem
          label="Repeated Words"
          title="Checks for repeated words e.g. for for"
          value={!repeatedWords}
          checked={repeatedWords}
          onChange={setRepeatedWords}
        />
      ),
    },
    {
      label: 'Indefinite Article',
      custom: (
        <CheckboxItem
          label="Indefinite Article"
          title="Checks if indefinite articles (a and an) are used correctly"
          value={!indefiniteArticle}
          checked={indefiniteArticle}
          onChange={setIndefiniteArticle}
        />
      ),
    },
    {
      label: 'Equality',
      hasSeparator: true,
      custom: (
        <CheckboxItem
          label="Equality"
          title="Checks for possibly insensitive, inconsiderate language"
          value={!equality}
          checked={equality}
          onChange={setEquality}
        />
      ),
    },
    {
      heading: 'Account',
      icon: 'github' as const,
      prefix: 'fab' as const,
      label: 'Github',
      onClick: gitlink,
    },
    {
      icon: 'sign-out-alt' as const,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return { items, logout: data?.logout, called }
}
