import { ThemeProvider } from '../src/components/providers/ThemeProvider/ThemeProvider'
import { IconProvider } from '../src/components/providers/IconProvider/IconProvider'
import { RecoilRoot } from 'recoil'
import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import '../src/theme/ColorPalette.css'
import { GlobalStyle } from '../src/components/utility/GlobalStyle/GlobalStyle'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <ThemeProvider>
        {(typography) => (
          <IconProvider>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            <Story />
          </IconProvider>
        )}
      </ThemeProvider>
    </RecoilRoot>
  ),
]
