import { createGlobalStyle } from 'styled-components'

import { ITheme } from '../../../theme/styled'
import { darken, lighten } from '../../../utils'

export const GlobalStyle = createGlobalStyle<{
  theme: ITheme
}>`
  /*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */
  
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
  
  ::-webkit-scrollbar {
    display: none;
  }

  /* Document
     ========================================================================== */
  
  /**
   * Use a better box model (opinionated).
   */
  
  html {
    box-sizing: border-box;
    min-height: 100%;
    height: 100%;
    width: 100%;
    overflow: hidden!important;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  /**
   * Use a more readable tab size (opinionated).
   */
  
  :root {
    -moz-tab-size: 4;
    tab-size: 4;
  }
  
  /**
   * 1. Correct the line height in all browsers.
   * 2. Prevent adjustments of font size after orientation changes in iOS.
   */
  
  html {
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  /* Sections
     ========================================================================== */
  
  /**
   * Remove the margin in all browsers.
   */
  
  body {
    height: 100%;
    margin: 0;
    background-color: var(--background-primary);
    font-size-adjust: 0.5;
  }
  
  #root {
    height: 100%;
  }
  
  img {
    margin-bottom: 0!important;
  }
  
  /* Text-level semantics
     ========================================================================== */
  
  /* unvisited link */

  a {
    text-decoration: underline;
  }

  a:link {
    color: var(--text-primary);
  }

  a:visited {
    color: var(--text-primary);
  }
  
  @media (hover: hover) and (pointer: fine) {
    a:hover {
      color: var(--accent-primary);
    }
  }

  a:active {
    color: var(--accent-primary);
  }
  
  p {
    color: var(--text-primary)!important;
  }
  
  h1 {
    color: var(--text-primary)!important;
    font-weight: bold!important;
  }
  
  h2 {
    color: var(--text-primary)!important;
    font-weight: bold!important;
  }
  
  h3 {
    color: var(--text-primary)!important;
    font-weight: bold!important;
  }
  
  h4 {
    color: var(--text-primary)!important;
  }
  
  h5 {
    color: var(--text-primary)!important;
  }
  
  h6 {
    color: var(--text-primary)!important;
  }
  
  li {
    color: var(--text-primary)!important;
  }
  
  pre {
    font-size: 1em!important;
  }
  
  /* Grouping content
     ========================================================================== */
  
  /**
   * Add the correct height in Firefox.
   */
  
  hr {
    height: 0;
    background: var(--accent-primary)!important;
  }
  
  /* Text-level semantics
     ========================================================================== */
  
  /**
   * Add the correct text decoration in Chrome, Edge, and Safari.
   */
  
  abbr[title] {
    text-decoration: underline dotted;
  }
  
  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */
  
  b,
  strong {
    font-weight: bolder;
  }
  
  /**
   * 1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
   * 2. Correct the odd \`em\` font sizing in all browsers.
   */
  
  code,
  kbd,
  samp,
  pre {
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  
  /**
   * Add the correct font size in all browsers.
   */
  
  small {
    font-size: 80%;
  }
  
  /**
   * Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
   */
  
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }
  
  /* Forms
     ========================================================================== */
  
  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
   
   form {
    margin-bottom: 0!important;
   }
   
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    border: none;
  }
  
  textarea {
    opacity: 0;
  }
  
  input {
    padding: ${({ theme }) => theme.spacing.xs};
    width: 100%;
   }
  
  /**
   * Remove the inheritance of text transform in Edge and Firefox.
   * 1. Remove the inheritance of text transform in Firefox.
   */
   
  button,
  select { /* 1 */
    text-transform: none;
  }
  
  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */
  
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
  
  /**
   * Remove the inner border and padding in Firefox.
   */
  
  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  /**
   * Restore the focus styles unset by the previous rule.
   */
  
  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  
  button:focus {
  outline: none
  }
  
  button {
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    display: flex;
  }
  
  /**
   * Correct the padding in Firefox.
   */
  
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  
  /**
   * Remove the padding so developers are not caught out when they zero out \`fieldset\` elements in all browsers.
   */
  
  legend {
    padding: 0;
  }
  
  /**
   * Add the correct vertical alignment in Chrome and Firefox.
   */
  
  progress {
    vertical-align: baseline;
  }
  
  /**
   * Correct the cursor style of increment and decrement buttons in Safari.
   */
  
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  
  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */
  
  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }
  
  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */
  
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to \`inherit\` in Safari.
   */
  
  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }
  
  /* Interactive
     ========================================================================== */
  
  /*
   * Add the correct display in Chrome and Safari.
   */
  
  summary {
    display: list-item;
  }
  
  /* Table
     ========================================================================== */
  
  table {
    color: var(--text-primary)!important;
  }
  
  td, th {
    border-bottom: 1px solid var(--accent-primary)!important;
  }
`
