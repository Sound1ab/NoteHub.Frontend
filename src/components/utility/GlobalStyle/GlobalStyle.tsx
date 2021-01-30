import '../../../theme/ColorPalette.css'

import { createGlobalStyle } from 'styled-components'

import { ITheme } from '../../../theme/styled'
import { darken } from '../../../utils/css/darken'
import { lighten } from '../../../utils/css/lighten'

export const GlobalStyle = createGlobalStyle<{
  theme: ITheme
}>`
  [data-theme="light"] {
    --background-primary: var(--light-primary);
    --background-secondary: ${darken('--light-primary', 0.03)};
    --background-tertiary: ${darken('--light-primary', 0.05)};
    --background-quaternary: ${darken('--light-primary', 0.07)};
    --background-quinary: ${darken('--light-primary', 0.1)};
    --border-primary: ${lighten('--light-primary', 0.03)};
    --text-primary: ${lighten('--dark-primary', 0.1)};
    --text-secondary: ${lighten('--dark-primary', 0.3)};
    --text-tertiary: ${lighten('--dark-primary', 0.5)};
  }
  
  [data-theme="dark"] {
    --background-primary: var(--dark-primary);
    --background-secondary: ${lighten('--dark-primary', 0.03)};
    --background-tertiary: ${lighten('--dark-primary', 0.05)};
    --background-quaternary: ${lighten('--dark-primary', 0.07)};
    --background-quinary: ${lighten('--dark-primary', 0.1)};
    --border-primary: ${darken('--dark-primary', 0.03)};
    --text-primary: ${darken('--light-primary', 0.1)};
    --text-secondary: ${darken('--light-primary', 0.3)};
    --text-tertiary: ${darken('--light-primary', 0.5)};
  }
`
